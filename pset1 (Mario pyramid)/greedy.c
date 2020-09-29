#include <stdio.h>
#include <cs50.h>
#include <math.h>

int main(void)
{
    printf("O hai! How much change is owed?\n");
    float due = GetFloat();
    //check to see if we have a float larger than 0
    while ( due < 0 )
    {
        printf("How much change is owed?\n");
        due = GetFloat();
    }
    int no_coins=0;
    //give change and count coins
    while (due >= 0.25)
    {
        due-=0.25;
        no_coins++;
    }
    due+=0.001; //for precision purposes
    while (due >= 0.10)
    {
        due-=0.10;
        no_coins++;
    }   
    due+=0.001; //for precision purposes
    while (due >= 0.05)
    {
        due-=0.05;
        no_coins++;
    }
    due+=0.001; //for precision purposes
    while (due>=0.01)
    {
        due-=0.01;   
        no_coins++;
        
    }
    printf("%d\n",no_coins);
}