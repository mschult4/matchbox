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

try:
    conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
except:
    logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
    sys.exit()

logger.info("SUCCESS: Connection to RDS mysql instance succeeded")


def handler(event, context):
    """
    This function fetches content from mysql RDS instance
    """
    
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
        values = []
        
        count = 0
        if data and 'boxer_id_u' in data:
            insertstr += "update boxers_real set "
            if  'first_u' in data:
                if count > 0:
                    insertstr += ", "
                insertstr += "mixed_first=%s "
                values.append(data['first_u'])
                count += 1
            if  'last_u' in data:
                if count > 0:
                    insertstr += ", "
                insertstr += "mixed_last=%s "
                values.append(data['last_u'])
                count += 1
            if  'goes_by_u' in data:
                if count > 0:
                    insertstr += ", "
                insertstr += "mixed_goes_by=%s "
                values.append(data['goes_by_u'])
                count += 1
            if  'year_u' in data:
                if count > 0:
                    insertstr += ", "
                insertstr += "year=%s "
                values.append(data['year_u'])
                count += 1
            if  'hall_u' in data:
                if count > 0:
                    insertstr += ", "
                insertstr += "hall=%s "
                values.append(data['hall_u'])
                count += 1
            if  'eligible_u' in data:
                if count > 0:
                    insertstr += ", "
                insertstr += "eligible=%s "
                values.append(data['eligible_u'])
                count += 1
            if  'experience_u' in data:
                if count > 0:
                    insertstr += ", "
                insertstr += "experience=%s "
                values.append(data['experience_u'])
                count += 1
            if  'vet_years_u' in data:
                if count > 0:
                    insertstr += ", "
                insertstr += "vet_years=%s "
                values.append(data['vet_years_u'])
                count += 1
            if  'weight_u' in data:
                if count > 0:
                    insertstr += ", "
                insertstr += "weight=%s "
                values.append(data['weight_u'])
                count += 1
            if  'handedness_u' in data:
                if count > 0:
                    insertstr += ", "
                insertstr += "handedness=%s "
                values.append(data['handedness_u'])
                count += 1
            if  'captain_u' in data:
                if count > 0:
                    insertstr += ", "
                insertstr += "captain=%s "
                values.append(data['captain_u'])
                count += 1
            if  'gender_u' in data:
                if count > 0:
                    insertstr += ", "
                insertstr += "gender=%s "
                values.append(data['gender_u'])
                count += 1
            insertstr += "where boxer_id=%s "
            values.append(data['boxer_id_u'])
        
        

        cur.execute(insertstr,values)
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

