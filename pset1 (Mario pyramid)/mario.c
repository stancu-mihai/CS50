#include <stdio.h>
#include <cs50.h>

int main(void)
{
    printf("Height: ");
    int height=GetInt();
    //check to see if we have a integer between 0 and 23
    while ( (height < 0) || (height > 23) )
    {
        printf("Retry: ");
        height=GetInt();
    }
    //draw the half piramid
    int hashes=2;
    while (hashes<height+2)
    {
        for(int i=1;i<height-hashes+2;i++)
        {
            printf(" ");
        }
        for(int j=1;j<=hashes;j++)
        {
            printf("#");
        }
        printf("\n");  
        hashes++;
    }
}