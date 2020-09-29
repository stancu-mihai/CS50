#include <stdio.h>
#include <cs50.h>
#include <string.h>
#include <ctype.h>

int main(void)
{
    // Get name from the keyboard
    string name=GetString();
    // Compute length of name
    int name_length=strlen(name);
    // Print the first letter of the input string in uppercase
    printf("%c",toupper(name[0])); 
    // Loop through the name and print initials
    for(int i = 0;i < name_length;i++)
    {
        if (name[i] == ' ')
        {
            // If space is encountered, print the next letter in uppercase
            printf("%c",toupper(name[i + 1]));
        }
    }
    printf("\n");
}