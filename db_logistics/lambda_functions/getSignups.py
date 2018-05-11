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


def handler(event, context):
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    try:
        conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
    except:
        logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
        sys.exit()
    
    logger.info("SUCCESS: Connection to RDS mysql instance succeeded")
    """
    This function fetches content from mysql RDS instance
    """
    data = event['queryStringParameters']


    with conn.cursor() as cur:
        logger.info("inside conn.cursor()")

           
        insertstr = "select boxer_1_id as boxer, boxer_2_id as opp, date, ring, spar_slot, mixed_first, mixed_last, weight, experience, handedness from spar_signups, boxers_real where spar_signups.boxer_1_id=boxers_real.boxer_id union select boxer_2_id as boxer, boxer_1_id as opp, date, ring, spar_slot, mixed_first, mixed_last, weight, experience, handedness from spar_signups, boxers_real where spar_signups.boxer_2_id=boxers_real.boxer_id"
        values = []

        attr = ['num_spar','date','boxer_id','opp_id','num_rounds','len_rds', 'comments','score','coach_initials','season','gender','med_comm']
        
        count = 0
        if data:
            for a in attr:
                if a in data:
                    if count > 0:
                        insertstr += " and "
                    insertstr += a + "=%s"
                    values.append(data[a])
                    count += 1
        

        cur.execute(insertstr, values)

        row_headers = [x[0] for x in cur.description]  # this will extract row headers
        rv = cur.fetchall()
        ret_data = []
        for i, result in enumerate(rv):
            ret_data.append(dict(zip(row_headers, result)))
        
        print ret_data
        
        response = {
            "statusCode": 200,
            "headers": {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers" : "Access-Control-Allow-Origin,Content-Type"},
            "body" : json.dumps(ret_data, default=str)
        };

        return response


