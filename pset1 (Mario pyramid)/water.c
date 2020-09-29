#include <stdio.h>
#include <cs50.h>

int main(void)
{
    printf("minutes:");
    int min=GetInt();
    printf("bottles:%d\n",min*12);//print bottles=minutes times 12
}