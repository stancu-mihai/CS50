/**
 * dictionary.c
 *
 * Computer Science 50
 * Problem Set 5
 *
 * Implements a dictionary's functionality.
 */

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

#include "dictionary.h"

trie* root;

bool freenode(trie* node)
{
    // If the node received is null, cannot free it
    if (node == NULL)
    {
        return false;
    }
    // If the node is not null, free it
    else
    {
        // Go through each of the nodes and free them
        for(int i = 0; i <= 27;i++)
        {
            if ((*node).child[i] != NULL)
            {
                freenode((*node).child[i]);
            }
        }
        // After all the childs are free, free the parent
        free(node);
        return true;
    }
}

/**
 * Returns true if word is in dictionary else false.
 */
bool check(const char* word)
{
    // Find the position to search the first letter
    int pos;
    // The first parent_node will be root
    trie* node;
    // Find the length of the word
    int n = 0;
    while(word[n] != '\0')
    {
        n = n + 1;
    }
    bool found = false;
    for(int i = 0; i < n; i++)
    {
        if (i == 0)
        {
            node = root;
            pos = tolower(word[i]) - 'a';
            if (word[i] == '\'')
            {
                pos = 27;
            }
        }
        // Define a child node a level under, for using in is_word test
        trie* child_node = (*node).child[pos];
        if (child_node == NULL)
        {
            return false;
        }
        
        // If this is the last letter of the word, 
        // the node doesn't have child but is word
        if (((i + 1) == n) && 
           ((*child_node).is_word == true) && 
           ((*node).child[pos] != NULL))
        {
            found = true;
        }
        // We are not done yet, but there are still nodes to search
        else if((*node).child[pos] != NULL)
        {
            // Make the child the new node
            node = (*node).child[pos];
            pos = tolower(word[i + 1]) - 'a';
            if (word[i + 1] == '\'')
            {
                pos = 27;
            }
        }
    }
    return found;
}

/**
 * Loads dictionary into memory.  Returns true if successful else false.
 */
bool load(const char* dictionary)
{
    // Open dictionary file in read mode
    FILE *filep = fopen(dictionary, "r");
    bool all_ok = true;
    char chr;
    do
    {
        // Reset index
        int i = 0;
        chr = 'a';
        // Position to insert character
        int pos;
        trie* parent_node;

        while((chr != EOF) && (chr != '\n'))
        {
            // If we are at the first letter of the word 
            // then this is the root node
            if (i == 0)
            {
                // If the root node was not created, create it
                if (root == NULL)
                {
                    // Allocate memory on heap for the root trie node
                    root = (trie *) calloc(1, sizeof(trie));
                }
                parent_node = root;
            }

            // Get next character of the line
            chr = fgetc(filep);

            if ((chr != EOF) && (chr != '\n') && 
               ((isalpha(chr)) || (chr == '\'') ))
            {
                pos = tolower(chr) - 'a';
                if (chr == '\'')
                {
                    pos = 27;
                }

                // If the seat isn't taken, take it
                if ((*parent_node).child[pos] == NULL)
                {
                    // Allocate memory on heap for the node
                    trie* node;
                    node = (trie *) calloc(1, sizeof(trie));
                    // Link the parent node to this one
                    (*parent_node).child[pos] = node;
                    if (node == NULL)
                    {
                        printf("Memory allocation error\n");
                        all_ok = false;
                    }
 
                    // Become the parent for the next iteration
                    parent_node = node;
                }
                else
                {
                    // Child becomes father for next iteration
                    parent_node = (*parent_node).child[pos];
                }
            
                i = i + 1;
            }
            else if ( chr == '\n')
            {   
                // Mark as word if it is the last character to be written
                (*parent_node).is_word = true;
                no_words++;
            }
        }
    }while(chr != EOF);
    fclose(filep);
    return all_ok;
}

/**
 * Returns number of words in dictionary if loaded else 0 if not yet loaded.
 */
unsigned int size(void)
{
    if (root == NULL)
    {
        return 0;
    }
    else 
    {
        return no_words;
    }
}

/**
 * Unloads dictionary from memory.  Returns true if successful else false.
 */
bool unload(void)
{
    return freenode(root);
}

