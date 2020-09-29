#include <stdio.h>
#include <cs50.h>
#include <string.h>

int main(int argc, char *argv[])
{
    // Check if number of args is <> 1 and return error if so
    if (argc != 2)
    {
        printf("Number of key supplied differs than one!\n");
        return 1;
    }
    else
    {
        // Get name from the keyboard
        string msg=GetString();
        
        // Compute length of message
        int msg_length=strlen(msg);
        
        // Get the key from argv
        int key = atoi(argv[1]);
        
        // Obtain a key between 0 and 25
        while((key < 0) || (key > 25))
        {
            if (key < 0) 
            {
                key += 26;
            }
            if (key > 25) 
            {
                key -= 26;
            }
        }

        // Crypt the message by flipping each character
        for(int i = 0; i < msg_length ;i++)
        {
            // The next line just checks if msg[i] is a letter
            if ( ((msg[i] >= 65) && (msg[i] <= 90)) || 
                 ((msg[i] >= 97) && (msg[i] <= 122)) )
            {
                // if it exceeds ascii 122, just remove 26 from the sum
                if ((msg[i] + key) > 122)
                {
                    printf("%c", (msg[i] + key - 26));    
                }
                // if it ends up between ascii 90 and ascii 97, subtract 26
                else if ( ((msg[i] + key) > 90) && 
                          ((msg[i] + key) < 97) )
                {
                    printf("%c", (msg[i] + key - 26));   
                }
                // Otherwise don't remove anything, just add the key
                else
                {
                    printf("%c", (msg[i] + key));  
                }
            }
            else
            {
                // If it's not a letter, print it as it is!
                printf("%c", msg[i]);    
            }
        }
        // Print the crypted message
        printf("\n");
        
        // Return the code for everything ok
        return 0;
    }
    
}