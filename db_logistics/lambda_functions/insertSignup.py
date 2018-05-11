import sys
import logging
import rds_config
import pymysql
import json
#rds settings
rds_host = "mydbinstance.cv5arieaa43b.us-east-2.rds.amazonaws.com"
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name


logger = logging.getLogger()
logger.setLevel(logging.INFO)


def handler(event, context):
    try:
        conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
    except:
        logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
        sys.exit()
    
    logger.info("SUCCESS: Connection to RDS mysql instance succeeded")
    """
    This function updates spar_signups
    """
    
    put_data = json.loads(event['body'])

    with conn.cursor() as cur:
        response = {
            "statusCode": 200,
            "headers": {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers" : "Access-Control-Allow-Origin,Content-Type"}
        };
        body = {}
        body['issue'] = 'none'
        
        cur.execute("select * from spar_signups where spar_slot=%s and date=%s and ring=%s", [put_data["slot"], put_data["day"], put_data["ring"]])
        row_headers = [x[0] for x in cur.description]  # this will extract row headers
        rv = cur.fetchall()
        data = []
        for i, result in enumerate(rv):
            data.append(dict(zip(row_headers, result)))
        # Now have: one row containing the spar, or nothing
        
        #get current boxer weight, check for zero
        cur.execute("select weight from boxers_real where boxer_id=%s", [put_data["boxer_id"]])
        cur_boxer_weight = int(cur.fetchall()[0][0])
        if cur_boxer_weight == 0:
           body['issue'] = 'zero'
           response['body'] = json.dumps(body)
           return response
       
        #get opponent weight, check for compatibility
        if data and (data[0]["boxer_1_id"] or data[0]["boxer_2_id"]):
            if data[0]["boxer_1_id"]:
                cur.execute("select weight from boxers_real where boxer_id=%s", [data[0]["boxer_1_id"]])
            elif data[0]["boxer_2_id"]:
                cur.execute("select weight from boxers_real where boxer_id=%s", [data[0]["boxer_2_id"]])
            opp_weight = cur.fetchall()[0][0]
            if opp_weight < cur_boxer_weight-10 or opp_weight > cur_boxer_weight+10:
                body['issue'] = 'weight'
                response['body'] = json.dumps(body)
                return response
        
        #select spars for this boxer id and make sure no dates are within one day
        cur.execute("select * from spar_signups where boxer_1_id=%s or boxer_2_id=%s", [put_data['boxer_id'], put_data['boxer_id']])
        row_headers = [x[0] for x in cur.description]  # this will extract row headers
        rv = cur.fetchall()
        spars = []
        for i, result in enumerate(rv):
            spars.append(dict(zip(row_headers, result)))
        for s in spars:
            if s['date'].year == int(put_data['day'][:4]) and s['date'].month == int(put_data['day'][5:7]) and (s['date'].day >= int(put_data['day'][8:])-1 and s['date'].day <= int(put_data['day'][8:])+1):
                body['issue'] = 'day'
                response['body'] = json.dumps(body)
                return response
        
        #if no problems, insert or update
        if data: # update
            if not data[0]["boxer_2_id"]:
                insertstr = "update spar_signups set boxer_2_id=%s where date=%s and ring=%s and spar_slot=%s"
            elif not data[0]["boxer_1_id"]:
                insertstr = "update spar_signups set boxer_1_id=%s where date=%s and ring=%s and spar_slot=%s"
            else:
                body['issue'] = 'full'
                response['body'] = json.dumps(body)
                return response
        else: # insert
            insertstr = "insert into spar_signups(boxer_1_id, date, ring, spar_slot) values(%s, %s, %s, %s)"
        values = [put_data['boxer_id'], put_data['day'], put_data['ring'], put_data['slot']]
        cur.execute(insertstr, values)
        conn.commit()

        cur.execute("select * from spar_signups")
        row_headers = [x[0] for x in cur.description]  # this will extract row headers
        rv = cur.fetchall()
        final_signups = []
        for i, result in enumerate(rv):
            json_ready = list(result)
            json_ready[2] = json_ready[2].strftime('%Y-%m-%d')
            final_signups.append(dict(zip(row_headers, json_ready)))
            
        body['signups_table'] = final_signups
        response["body"] = json.dumps(body)
        
        return response

