import requests
from bs4 import BeautifulSoup
import sys

# WILL neeed to modify 0 1 based on result to fit the design document


def search_email_in_directory(email):
    # Input the email to the search bar
    url = f'https://www.purdue.edu/directory/?searchString={email}'
    
    # Send a request to the purdue directory
    response = requests.get(url)
    
    # If the get request was successful, search for the email.
    if not response.status_code == 200:
        return f'FAIL: Failed to fetch data from the directory. Status code: {response.status_code}'
    
    else:
        soup = BeautifulSoup(response.text, 'html.parser')
        results = soup.find_all('table', class_='more')

        if results:
            for result in results:
                
                name = result.find('h2', class_='cn-name').text.strip()
                email = result.find('a', href=True).text
                # email = email_link.text if email_link else 'Email not found'
                res = 'SUCCESS'
                return res
                
        else:
            return 'FAIL: user not found in the directory'

# Printing to terminal
print(search_email_in_directory(sys.argv[1]))
