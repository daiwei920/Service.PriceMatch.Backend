import requests
def handler(event, context):   

    print('request: ', event)

    response = requests.get("https://api.cyberlark.com.au/housing/stampduty?state=SA&investment_type=investment&property_value=950000&property_type=established&first_home_buyer=true&foreign_buyer=false")
    print(response.text)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'text/plain'
        },
        'body': 'Hello, CDK! You have hit {}\n'.format(event['path'])
    }

