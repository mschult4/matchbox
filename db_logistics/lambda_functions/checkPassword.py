mport sys
import logging
import rds_config
import pymysql
import json
import hashlib
#rds settings
rds_host = "mydbinstance.cv5arieaa43b.us-east-2.rds.amazonaws.com"
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name

print "started running"


def handler(event, context):
    """
    This function fetches content from mysql RDS instance
    """

    logger = logging.getLogger()
    logger.setLevel(logging.INFO)

    try:
        conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
    except:
        logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
        sys.exit()

    logger.info("SUCCESS: Connection to RDS mysql instance succeeded")

    with conn.cursor() as cur:
        to_return = {"verified": "false"}
        
        data = json.loads(event['body'])
        print(data)
        pw_hash = hashlib.sha1(data['password'].encode()).hexdigest()
        print(pw_hash)


        cur.execute("select * from signin where username=%s and password=%s", [data['username'], pw_hash])
        
        row_headers = [x[0] for x in cur.description]  # this will extract row headers
        rv = cur.fetchall()
        query_results = []
        for result in rv:
            print(result)
            query_results.append(dict(zip(row_headers, result)))
        
        print query_results
        
        if rv:
            to_return['verified'] = "true"
            to_return['boxer_id'] = query_results[0]['boxer_id']
            if query_results[0]['boxer_id'] < 0:
                to_return['usertype'] = "coach"
            else:
                to_return['usertype'] = "boxer"
        
        #print to_return
        response = {
            "statusCode": 200,
            "headers": {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers" : "Access-Control-Allow-Origin,Content-Type"},
            "body" : json.dumps(to_return) #json.dumps(ret_dict)
        }
            
        return response

