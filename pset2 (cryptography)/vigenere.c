#include <stdio.h>
#include <cs50.h>
#include <string.h>
#include <ctype.h>

int main(int argc, char *argv[])
{
    // Assume key is alphabetic
    bool onlyletters = true;
    
    // Declare a temporary key to be integer
    int key;
    
    // Iterate through the characters of the key to find its length
    // and to find if it is alphabetic
    int key_length = 0;
    if (argc > 1)
    {
        while(!(argv[1][key_length] == '\0'))
        {
            if (!isalpha(argv[1][key_length])) 
            {
                onlyletters = false;
            }
            key_length++;
        }
    }
    
     // Check if number of args is <> 1 and return error if so
    if (argc != 2)
    {
        printf("Number of key supplied differs than one!\n");
        return 1;
    }
   
    // if the key does not contain only letters
    else if ( !onlyletters ) 
    {
        printf("Key contains other characters than letters!");
        return 1;
    }
         else
    {
        // Get name from the keyboard
        string msg=GetString();
         
        // Compute length of message
        int msg_length=strlen(msg);
              
        int j = 0;

        // Crypt the message by flipping each character 
        // i is the counter for message string
        // j is the counter for key string
        for(int i = 0; i < msg_length ;i++)
        {
        // The next line just checks if msg[i] is a letter
            if ( isalpha(msg[i]) )
            {
            // Transform "A" and "a" to key 0
                if (argv[1][j] >= 97)
                {
                    key = (int) argv[1][j] - 97;    
                }
                else 
                {
                    key = (int) argv[1][j] - 65;    
                }
                
                // If the letter from the message is uppercase
                if (isupper(msg[i]))
                {
                    if ((msg[i] + key) > 90)
                    {
                        printf("%c", msg[i] + key - 26);
                    }
                    else 
                    {
                        printf("%c", msg[i] + key);
                    }
                }
                // If it's lowercase
                else 
                {
                    if ((msg[i] + key) > 122)
                    {
                        printf("%c", msg[i] + key - 26);
                    }
                    else 
                    {
                        printf("%c", msg[i] + key);
                    }
                }
                
                // Move to the next letter of key string,
                // if the last, then start over
                if ((j + 1) >= key_length) 
                {
                    j = 0;
                }
                else
                {
                    j = j + 1;
                }
            }
            else
            {
                // If it's not a letter, print it as it is!
                printf("%c", msg[i]);    
              }
              
        }
        // Return the code for everything ok
        printf("\n");
        return 0;
    }
}