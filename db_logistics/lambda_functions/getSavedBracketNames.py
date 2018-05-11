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
    print("BEFORE")
    try:
        conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
    except:
        logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
        sys.exit()
    print("AFTER")
    logger.info("SUCCESS: Connection to RDS mysql instance succeeded")
    
    """
    This function fetches content from mysql RDS instance
    """
    print("HANDLER")
    data = 0
    if event:
        data = json.loads(event['body']) 

    with conn.cursor() as cur:

        if not data:
            response = {
            "statusCode": 400,
            "headers": {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers" : "Access-Control-Allow-Origin,Content-Type"},
            "body" : json.dumps("Something's wrong") #json.dumps(ret_dict)
            };
            return response
        bracket_name = data["name"]
        bracket = data["bracket"]
        
        print bracket_name, bracket
        
        for row in bracket:
            values = []
            query = "insert into bracket (bracket_id, bracket_name, "
            count = 0
            for seed_var in bracket[row]:
                boxer_id = bracket[row][seed_var]
                if count == 0:
                    query += seed_var
                else:
                    query += ", "+seed_var
                count+=1
            query += ") values ("
            query += "%s, %s, "
            values.append(row)
            values.append(bracket_name)
            count=0
            for seed_var in bracket[row]:
                boxer_id = bracket[row][seed_var]
                values.append(boxer_id)
                if count == 0:
                    query += "%s"
                else:
                    query += ", %s"
                count+=1
            query += ")"

            print query, values
            
            cur.execute(query,values )
            conn.commit()
        

        response = {
            "statusCode": 200,
            "headers": {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers" : "Access-Control-Allow-Origin,Content-Type"},
            "body" : json.dumps({"result": "success"}) #json.dumps(ret_dict)
        };
        logger.info("after response")
        return response


