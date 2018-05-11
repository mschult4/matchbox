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
        
        cur.execute("select * from spar_signups where spar_slot=%s and date=%s and ring=%s", [put_data["slot"], put_data["day"], put_data["ring"]])
        row_headers = [x[0] for x in cur.description]  # this will extract row headers
        rv = cur.fetchall()
        data = []
        for i, result in enumerate(rv):
            data.append(dict(zip(row_headers, result)))
        # Now have: one row containing the spar
        

        if data: # update
            if data[0]["boxer_2_id"] and int(data[0]["boxer_2_id"]) == int(put_data["boxer_id"]):
                insertstr = "update spar_signups set boxer_2_id=NULL where date=%s and ring=%s and spar_slot=%s"
            elif int(data[0]["boxer_1_id"]) == int(put_data["boxer_id"]):
                insertstr = "update spar_signups set boxer_1_id=NULL where date=%s and ring=%s and spar_slot=%s"
        values = [ put_data['day'], put_data['ring'], put_data['slot']]
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

