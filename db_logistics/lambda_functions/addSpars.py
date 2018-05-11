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
           
        insertstr = "insert into spars"
        values = []
        values_str = ""
        
        count = 0
        if data:
            insertstr += " ("
            values_str = "values ("
            if  'num_spar_i_a' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "num_spar"
                values.append(data['num_spar_i_a'])
                count += 1
            if  'date_i_a' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "date"
                values.append(data['date_i_a'])
                count += 1
            if  'boxer_id_i_a' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "boxer_id"
                values.append(data['boxer_id_i_a'])
                count += 1
            if  'opp_id_i_a' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "opp_id"
                values.append(data['opp_id_i_a'])
                count += 1
            if  'score_i_a' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "score"
                values.append(data['score_i_a'])
                count += 1
            if  'num_rounds_i_a' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "num_rounds"
                values.append(data['num_rounds_i_a'])
                count += 1
            if  'len_rds_i_a' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "len_rds"
                values.append(data['len_rds_i_a'])
                count += 1
            if  'comments_i_a' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "comments"
                values.append(data['comments_i_a'])
                count += 1
            if  'coach_initials_i_a' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "coach_initials"
                values.append(data['coach_initials_i_a'])
                count += 1
            if  'season_i_a' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "season"
                values.append(data['season_i_a'])
                count += 1
            if  'gender_i_a' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "gender"
                values.append(data['gender_i_a'])
                count += 1
            if  'med_comm_i_a' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "med_comm"
                values.append(data['med_comm_i_a'])
                count += 1
            insertstr += ") "
            values_str += ")"
            insertstr += values_str
            
        print insertstr, values

        cur.execute(insertstr, values) #, insert)
        conn.commit()
        
        
        insertstr = "insert into spars"
        values = []
        values_str = ""
        
        count = 0
        if data:
            insertstr += " ("
            values_str = "values ("
            if  'num_spar_i_b' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "num_spar"
                values.append(data['num_spar_i_b'])
                count += 1
            if  'date_i_b' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "date"
                values.append(data['date_i_b'])
                count += 1
            if  'boxer_id_i_b' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "boxer_id"
                values.append(data['boxer_id_i_b'])
                count += 1
            if  'opp_id_i_b' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "opp_id"
                values.append(data['opp_id_i_b'])
                count += 1
            if  'score_i_b' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "score"
                values.append(data['score_i_b'])
                count += 1
            if  'num_rounds_i_b' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "num_rounds"
                values.append(data['num_rounds_i_b'])
                count += 1
            if  'len_rds_i_b' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "len_rds"
                values.append(data['len_rds_i_b'])
                count += 1
            if  'comments_i_b' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "comments"
                values.append(data['comments_i_b'])
                count += 1
            if  'coach_initials_i_b' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "coach_initials"
                values.append(data['coach_initials_i_b'])
                count += 1
            if  'season_i_b' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "season"
                values.append(data['season_i_b'])
                count += 1
            if  'gender_i_b' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "gender"
                values.append(data['gender_i_b'])
                count += 1
            if  'med_comm_i_b' in data:
                if count > 0:
                    insertstr += ", "
                    values_str += ", "
                values_str += "%s"
                insertstr += "med_comm"
                values.append(data['med_comm_i_b'])
                count += 1
            insertstr += ") "
            values_str += ")"
            insertstr += values_str
            
        print insertstr, values
            
        cur.execute(insertstr, values) #, insert)
        conn.commit()
        
        cur.execute("select num_spar, date, A.mixed_first as boxer_first, A.mixed_last as boxer_last, B.mixed_first as opp_first, B.mixed_last as opp_last, num_rounds, len_rds, comments, score, coach_initials, season, spars.gender, med_comm from spars, boxers_real A, boxers_real B where spars.boxer_id=A.boxer_id and spars.opp_id=B.boxer_id")
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
        logger.info("after response")
        return response


