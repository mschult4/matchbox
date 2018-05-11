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
           
        insertstr = "insert into boxers_real"
        values = []
        values_str = ""

        
        count = 0
        if data:
            insertstr += " ("
            values_str = "values ("
            if  'first_i' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "mixed_first"
                values.append(data['first_i'])
                count += 1
            if  'last_i' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "mixed_last"
                values.append(data['last_i'])
                count += 1
            if  'goes_by_i' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "mixed_goes_by"
                values.append(data['goes_by_i'])
                count += 1
            if  'year_i' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "year"
                values.append(data['year_i'])
                count += 1
            if  'hall_i' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "hall"
                values.append(data['hall_i'])
                count += 1
            if  'eligible_i' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "eligible"
                values.append(data['eligible_i'])
                count += 1
            if  'experience_i' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "experience"
                values.append(data['experience_i'])
                count += 1
            if  'vet_years_i' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "vet_years"
                values.append(data['vet_years_i'])
                count += 1
            if  'weight_i' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "weight"
                values.append(data['weight_i'])
                count += 1
            if  'handedness_i' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "handedness"
                values.append(data['handedness_i'])
                count += 1
            if  'captain_i' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "captain"
                values.append(data['captain_i'])
                count += 1
            if  'gender_i' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "gender"
                values.append(data['gender_i'])
                count += 1
            insertstr += ") "
            values_str += ")"
            insertstr += values_str
            
        cur.execute(insertstr, values) #, insert)
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

