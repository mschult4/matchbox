import sys
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
    print(data)

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
        values = []
    
        
        count = 0
        verified = False
        if data and 'boxer_id' in data:
            cur.execute("select * from signin where boxer_id = %s", data['boxer_id'])
            for a in cur.fetchall():
                id, uname, pw = a
            if 'old_pw' in data:
                if hashlib.sha1(data['old_pw'].encode()).hexdigest() == pw:
                    verified = True
                    insertstr += "update signin set "
                    if  'new_pw' in data:
                        insertstr += "password=%s "
                        values.append(hashlib.sha1(data['new_pw'].encode()).hexdigest())

                    insertstr += "where boxer_id=%s "
                    values.append(data['boxer_id'])
        
        if verified:
            cur.execute(insertstr,values)
        conn.commit()

        data.append({"verified" : verified})
        print(data)
        response = {
            "statusCode": 200,
            "headers": {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers" : "Access-Control-Allow-Origin,Content-Type"},
            "body" : json.dumps(data) #json.dumps(ret_dict)
        };
        logger.info("after response")
        return response


