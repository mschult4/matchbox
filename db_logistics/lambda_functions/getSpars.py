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

           
        insertstr = "select num_spar, date, A.mixed_first as boxer_first, A.mixed_last as boxer_last, B.mixed_first as opp_first, B.mixed_last as opp_last, num_rounds, len_rds, comments, score, coach_initials, season, spars.gender, med_comm from spars, boxers_real A, boxers_real B where spars.boxer_id=A.boxer_id and spars.opp_id=B.boxer_id"
        values = []

        attr = {'num_spar' : 'num_spar', 'date' : 'date', 'boxer_id' : 'A.boxer_id', 
                    'boxer_first' : 'A.mixed_first', 'boxer_last' : 'A.mixed_last', 'opp_id' : 'B.boxer_id',
                    'opp_first' : 'B.mixed_first', 'opp_last' : 'B.mixed_last', 'num_rounds' : 'num_rounds',
                    'len_rds' : 'len_rds', 'comments' : 'comments', 'score' : 'score', 'coach_initials' : 'coach_initials',
                    'season' : 'season', 'gender' : 'spars.gender', 'med_comm' : 'med_comm'
        }

        count = 0
        if data:
            for a in attr:
                if a in data:
                    insertstr += " and "
                    insertstr += attr[a] + "=%s"
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

