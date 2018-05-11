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
        '''
        Example code:
        cur.execute("create table Employee3 ( EmpID  int NOT NULL, Name varchar(255) NOT NULL, PRIMARY KEY (EmpID))")
        cur.execute('insert into Employee3 (EmpID, Name) values(1, "Joe")')
        cur.execute('insert into Employee3 (EmpID, Name) values(2, "Bob")')
        cur.execute('insert into Employee3 (EmpID, Name) values(3, "Mary")')
        
        '''
        insert = []

           
        searchstr = "select * from boxers_real"
        
        count = 0
        options = ['boxer_id','first','last','hall','year']
        if event['queryStringParameters']:
            for item in options:
                if item in event['queryStringParameters']:
                    searchstr += " where"
                    break
            if  'boxer_id' in event['queryStringParameters']:
                if count > 0:
                    searchstr += " and"
                searchstr += " boxer_id = %s"
                insert.append(event['queryStringParameters']['boxer_id'])
                count += 1
            if  'first' in event['queryStringParameters']:
                if count > 0:
                    searchstr += " and"
                searchstr += " mixed_first = %s"
                insert.append(event['queryStringParameters']['first'])
                count += 1
            if  'last' in event['queryStringParameters']:
                if count > 0:
                    searchstr += " and"
                searchstr += " mixed_last = %s"
                insert.append(event['queryStringParameters']['last'])
                count += 1
            if  'year' in event['queryStringParameters']:
                if count > 0:
                    searchstr += " and"
                searchstr += " year = %s"
                insert.append(event['queryStringParameters']['year'])
                count += 1
            if 'hall' in event['queryStringParameters']:
                if count > 0:
                    searchstr += " and"
                searchstr += " hall = %s"
                insert.append(event['queryStringParameters']['hall'])
                count += 1
        

        cur.execute(searchstr, insert) #, insert)
        conn.commit()
        row_headers = [x[0] for x in cur.description]  # this will extract row headers
        rv = cur.fetchall()
        data = []
        for i, result in enumerate(rv):
            data.append(dict(zip(row_headers, result)))

        json_data = {
            "statusCode": 200,
            "body": json.dumps(data),
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        };
        return json_data

