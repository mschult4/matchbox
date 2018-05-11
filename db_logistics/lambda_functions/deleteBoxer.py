mport sys
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
    
    
    data = json.loads(event['body'])

    with conn.cursor() as cur:
        logger.info("inside conn.cursor()")
        '''
        Example code:
        cur.execute("create table Employee3 ( EmpID  int NOT NULL, Name varchar(255) NOT NULL, PRIMARY KEY (EmpID))")
        cur.execute('insert into Employee3 (EmpID, Name) values(1, "Joe")')
        cur.execute('insert into Employee3 (EmpID, Name) values(2, "Bob")')
        cur.execute('insert into Employee3 (EmpID, Name) values(3, "Mary")')
        conn.commit()
        '''
           
        insertstr = ""
        signinstr = ""
        values = []

        attr = {'boxer_id_d': 'boxer_id'}
        
        count = 0
        if data:
            insertstr = "delete from boxers_real where "
            signinstr = "delete from signin where "
            for a in attr:
                if a in data:
                    if count > 0:
                        insertstr += " and "
                        signinstr += " and "
                    insertstr += attr[a] + "=%s"
                    signinstr += attr[a] + "=%s"
                    values.append(data[a])
                    count += 1

        cur.execute(insertstr, values) #, insert)
        cur.execute(signinstr, values) #, insert)
        conn.commit()

        cur.execute("select * from boxers_real")
        row_headers = [x[0] for x in cur.description]  # this will extract row headers
        rv = cur.fetchall()
        data = []
        for i, result in enumerate(rv):
            data.append(dict(zip(row_headers, result)))
        
        
        response = {
            "statusCode": 200,
            "headers": {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers" : "Access-Control-Allow-Origin,Content-Type"},
            "body" : json.dumps(data) #json.dumps(ret_dict)
        };
        logger.info("after response")
        return response

