/**
 * helpers.c
 *
 * Computer Science 50
 * Problem Set 3
 *
 * Helper functions for Problem Set 3.
 */
       
#include <cs50.h>
#include <stdio.h>
#include "helpers.h"

int max(int no1, int no2)
{
    if (no1 >= no2) 
    {
        return no1;
    }
    else 
        return no2;
}

bool bin_search(int value, int values[], int n, int startpos, int endpos)
{
    // Compute position of middle element
    int middle=(int) (startpos + (endpos - startpos) / 2);            
    // While the list has > 0 elements
    while(n > 0)
    {
        if (value == values[middle])                                   
        {
            return true; 
        }
        else if (value < values[middle])                               
        {
            return bin_search(value, values, (int) (n / 2),
                   startpos, middle - 1);
        }
        else if (value > values[middle])                                
        {
            return bin_search(value, values, (int) (n / 2) , 
                   middle + 1, endpos);
        }
        else 
        {
            return false;
        }
    }
    return false;
}

/**
 * Returns true if value is in array of n values, else false.
 */
bool search(int value, int values[], int n)
{
    return bin_search(value , values , n , 0 , n - 1);
}

/**
 * Sorts array of n values.
 */
void sort(int values[], int n)
{
    // Counter for the outer loop
    int j = 0;
    int val_switched=0;
    do
    {
        for(int i = 0;i < n - 1;i++)
        {
            if (values[i] > values[i + 1])
            {
                // Switch the values between themselves
                // Then increment the counter
                int aux = values[i];
                values[i] = values[i + 1];
                values[i + 1] = aux;
                val_switched++;
            }
        }
        j++;
    } while((!val_switched == 0) && (j <= n));
    return;
}
