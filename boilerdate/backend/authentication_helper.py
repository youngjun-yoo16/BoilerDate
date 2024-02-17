import requests
from bs4 import BeautifulSoup

# WILL neeed to modify 0 1 based on result to fit the design document


def search_email_in_directory(email):
    # Input the email to the search bar
    url = f'https://www.purdue.edu/directory/?searchString={email}'
    
    # Send a request to the purdue directory
    response = requests.get(url)
    
    # If the get request was successful, search for the email.
    if not response.status_code == 200:
        return f'Failed to fetch data from the directory. Status code: {response.status_code}'
    
    else:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Searching for the table with "more" class
        # ex:
        
        # <table class="more">
        #                 <thead>
        #                     <tr>
        #                         <th scope="col" colspan="2">jeongbin lee</th>
        #                     </tr>
        #                 </thead>
        #                 <tbody>
        #                         <tr>
        #                             <th class="icon-key" scope="row">Alias</th>
        #                             <td>lee3546</td>
        #                         </tr>
        #                                                                                 <tr><th class="icon-envelope-alt">Email</th><td><a href="mailto:lee3546@purdue.edu">lee3546@purdue.edu</a></td></tr>
        #                                                     <tr>
        #                             <th class="icon-library" scope="row">Campus</th>
        #                             <td>west lafayette</td>
        #                         </tr>
        #                                                     <tr><th class="icon-sitemap">Department</th><td>computer science</td></tr>
        #                                                     <tr>
        #                             <th class="icon-briefcase" scope="row">Title</th>
        #                             <td>cs uta 164 - student services</td>
        #                         </tr>
        #                                                     <tr><th class="icon-graduation">School</th>
        #                             <td>science</td></tr>
        #                                             </tbody>
        #             </table>
        
        results = soup.find_all('table', class_='more')

        if results:
            for result in results:
                
                name = result.find('h2', class_='cn-name').text.strip()
                email = result.find('a', href=True).text
                #email = email_link.text if email_link else 'Email not found'
                res = f'name: {name} email: {email}'
                return res
                
        else:
            return 'No results found'

# Example usage
print(search_email_in_directory('lee3546@purdue.edu'))
