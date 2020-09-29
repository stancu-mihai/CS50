/**
 * recover.c
 *
 * Computer Science 50
 * Problem Set 4
 *
 * Recovers JPEGs from a forensic image.
 */

#include <stdio.h>
#include <stdlib.h>

typedef enum { false, true } bool;

int main(void)
{
    char* infile = "card.raw";
    
    // open input file 
    FILE* inptr = fopen(infile, "r");
    if (inptr == NULL)
    {
        printf("Could not open %s.\n", infile);
        return 2;
    }

    // count files found
    int jpg_found = 0;
    
    // Check if we have started yet (if first jpg was found)
    bool started_yet = false;
    
    // Declare buffer
    char buffer[512];
    
    // Declare filename
    char filename[8];
    
    // Declare pointer to file
    FILE* outptr;
    
    // Read first 512 chars from the infile and store in buffer
    while(512 == fread(buffer, sizeof(char), 512, inptr))
    {
        // Check if the header is of jpeg type and if it is write it to file
        if ((buffer[0] == (char) 0xff) && 
            (buffer[1] == (char) 0xd8) && 
            (buffer[2] == (char) 0xff) && 
                 ((buffer[3] == (char) 0xe0) || 
                 (buffer[3] == (char) 0xe1) || 
                 (buffer[3] == (char) 0xe2) || 
                 (buffer[3] == (char) 0xe3) || 
                 (buffer[3] == (char) 0xe4) || 
                 (buffer[3] == (char) 0xe5) || 
                 (buffer[3] == (char) 0xe6) || 
                 (buffer[3] == (char) 0xe7) || 
                 (buffer[3] == (char) 0xe8) || 
                 (buffer[3] == (char) 0xe9) || 
                 (buffer[3] == (char) 0xea) || 
                 (buffer[3] == (char) 0xeb) || 
                 (buffer[3] == (char) 0xec) || 
                 (buffer[3] == (char) 0xed) || 
                 (buffer[3] == (char) 0xee) || 
                 (buffer[3] == (char) 0xef)))
        {
                        
            // Compose file name 
            if (jpg_found < 10)
            {
                sprintf(filename,"00%i.jpg",jpg_found);
            }
            else if (jpg_found < 100)
            {
                sprintf(filename,"0%i.jpg",jpg_found);
            }
            else 
            {
                sprintf(filename,"%i.jpg",jpg_found);
            }
                            
            // Increment number of jpeg found
            jpg_found++;
                            
            // If this is not the first jpeg found, close the previous file
            // before opening a new one
            if (started_yet)
            {
                fclose(outptr);
            }
            // If this is the first jpeg found, mark this
            else 
            {
                started_yet = true;
            }
            // Open file in write mode
            outptr = fopen(filename, "w");
                            
            // write 512 bytes to outfile
            fwrite(buffer, sizeof(char), 512, outptr);

        }

        // If we are through a jpeg, just write the buffer to the file
        else if (started_yet)
        {
            // write 512 bytes to outfile
            fwrite(buffer, sizeof(char), 512, outptr);
        }
    }
    fclose(inptr);
    fclose(outptr);
    // done
    return 0;
}