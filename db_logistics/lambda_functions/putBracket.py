mport sys
import logging
import rds_config
import pymysql
import json
import collections
#rds settings
rds_host = "mydbinstance.cv5arieaa43b.us-east-2.rds.amazonaws.com"
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name

def score_conv(score):
    if score == "0" or not score:
        return 0
    elif score == "1---":
        return 1
    elif score == "1--":
        return 2
    elif score == "1-":
        return 3
    elif score == "1":
        return 4
    elif score == "1+":
        return 5
    elif score == "1++":
        return 6
    elif score == "1+++":
        return 7
    elif score.startswith("2---"):
        return 8
    elif score == "2--":
        return 9
    elif score == "2-":
        return 10
    elif score == "2":
        return 11
    elif score == "2+":
        return 12
    elif score == "2++":
        return 12
    elif score == "2+++":
        return 13
    elif score == "3---":
        return 14
    elif score == "3--":
        return 15
    elif score == "3-":
        return 16
    elif score == "3":
        return 17
    elif score == "3+":
        return 18
    elif score == "3++":
        return 19
    elif score == "3+++":
        return 20
        
def call():
    return {"bracket" : "", "weight":0, "num_spars":0, "score":0, "first": "", "last":"", "num_scored": 0, "av_score":0, "comments":{}, "max_score_conv":0, "max_score":"0"}

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
    
    data = json.loads(event['body']) #not the right syntax, I don't think

    
    #logger.info()

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
        
        rankings = collections.defaultdict(call)
        
        seed_num = 8
        for i in range(seed_num):
            seed = "seed"+str(i+1)
        
            query = "select * from (select bracket_id, "+seed+", weight, boxer_id, mixed_first, mixed_last " 
            query += "from bracket, boxers_real where bracket."+seed+" = boxers_real.boxer_id "
            query += "and bracket_name=%s) A, spars where A.boxer_id =spars.boxer_id;" 
            
    
            cur.execute(query, data['name']) #, insert)

            rv = cur.fetchall()
            print rv
            for result in rv:
                weight = result[2]
                bracket = result[0]
                boxer_id = result[8]
                num_rounds = result[10]
                score = result[13]
                
                if score_conv(score) > rankings[boxer_id]["max_score_conv"]:
                    rankings[boxer_id]["max_score_conv"] = score_conv(score)
                    rankings[boxer_id]["max_score"] = score
                first = result[4]
                last = result[5]
                num_spar = result[6]
                comment = result[12]
                
                rankings[boxer_id]["num_spars"] += 1
                rankings[boxer_id]["score"] += score_conv(score)
                rankings[boxer_id]["first"] = first
                rankings[boxer_id]["last"] = last
                rankings[boxer_id]["weight"] = weight
                rankings[boxer_id]["comments"][num_spar] = comment
                rankings[boxer_id]["bracket"] = bracket
                rankings[boxer_id]["boxer_id"] = boxer_id
                rankings[boxer_id]["seed"] = i+1
                    
                    
        print rankings
        rank_l= collections.defaultdict(list)
        for index in rankings:
            print index
            bracket_letter = rankings[index]["bracket"]
            print "HEY  "+bracket_letter
            rank_l[bracket_letter].append(rankings[index])
            
        for index in rank_l:
            rank_l[index] = sorted(rank_l[index], key=lambda x : x['seed'], reverse=False)
        
        
        response = {
            "statusCode": 200,
            "headers": {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers" : "Access-Control-Allow-Origin,Content-Type"},
        };
        logger.info("after response")
        return response


