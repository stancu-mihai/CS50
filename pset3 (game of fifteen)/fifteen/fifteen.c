/**
 * fifteen.c
 *
 * Computer Science 50
 * Problem Set 3
 *
 * Implements Game of Fifteen (generalized to d x d).
 *
 * Usage: fifteen d
 *
 * whereby the board's dimensions are to be d x d,
 * where d must be in [DIM_MIN,DIM_MAX]
 *
 * Note that usleep is obsolete, but it offers more granularity than
 * sleep and is simpler to use than nanosleep; `man usleep` for more.
 */
 
#define _XOPEN_SOURCE 500

#include <cs50.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

// constants
#define DIM_MIN 3
#define DIM_MAX 9

// board
int board[DIM_MAX][DIM_MAX];

// dimensions
int d;

// prototypes
void clear(void);
void greet(void);
void init(void);
void draw(void);
bool move(int tile);
bool won(void);
int tile_pos[2];
int blank_pos[2];

int main(int argc, string argv[])
{
    // ensure proper usage
    if (argc != 2)
    {
        printf("Usage: fifteen d\n");
        return 1;
    }

    // ensure valid dimensions
    d = atoi(argv[1]);
    if (d < DIM_MIN || d > DIM_MAX)
    {
        printf("Board must be between %i x %i and %i x %i, inclusive.\n",
            DIM_MIN, DIM_MIN, DIM_MAX, DIM_MAX);
        return 2;
    }

    // open log
    FILE* file = fopen("log.txt", "w");
    if (file == NULL)
    {
        return 3;
    }

    // greet user with instructions
    greet();

    // initialize the board
    init();

    // accept moves until game is won
    while (true)
    {
        // clear the screen
        clear();

        // draw the current state of the board
        draw();

        // log the current state of the board (for testing)
        for (int i = 0; i < d; i++)
        {
            for (int j = 0; j < d; j++)
            {
                fprintf(file, "%i", board[i][j]);
                if (j < d - 1)
                {
                    fprintf(file, "|");
                }
            }
            fprintf(file, "\n");
        }
        fflush(file);

        // check for win
        if (won())
        {
            printf("ftw!\n");
            break;
        }

        // prompt for move
        printf("Tile to move: ");
        int tile = GetInt();
        
        // quit if user inputs 0 (for testing)
        if (tile == 0)
        {
            break;
        }

        // log move (for testing)
        fprintf(file, "%i\n", tile);
        fflush(file);

        // move if possible, else report illegality
        if (!move(tile))
        {
            printf("\nIllegal move.\n");
            usleep(500000);
        }

        // sleep thread for animation's sake
        usleep(500000);
    }
    
    // close log
    fclose(file);

    // success
    return 0;
}

/**
 * Clears screen using ANSI escape sequences.
 */
void clear(void)
{
    printf("\033[2J");
    printf("\033[%d;%dH", 0, 0);
}

/**
 * Greets player.
 */
void greet(void)
{
    clear();
    printf("WELCOME TO GAME OF FIFTEEN\n");
    usleep(2000000);
}

/**
 * Initializes the game's board with tiles numbered 1 through d*d - 1
 * (i.e., fills 2D array with values but does not actually print them).  
 */
void init(void)
{
    // Check if the board has odd number of tiles (d is even)
    bool iseven=(0 == (d % 2));
    for (int i = 0; i < d; i++)
    {
        for (int j = 0; j < d; j++)
        {
            // Compute the value that is going to be placed
            int newvalue = d * d - d * i - j - 1;
            // If the table  has odd number of tiles
            if (iseven)
            {
                // If 2 was the next value put 1 instead
                if (newvalue == 2)
                {
                    board[i][j] = 1;
                }
                // Otherwise if 1 was the next value put 2
                else if (newvalue == 1)
                {
                    board[i][j] = 2;
                }
                // Otherwise assign the value as it is
                else 
                {
                    board[i][j] = newvalue;
                }
            }
            // If the table  has even number of tiles
            else
            {
                board[i][j] = newvalue;
            }
        }
   }
}

/**
 * Prints the board in its current state.
 */
void draw(void)
{
    for (int i = 0; i < d; i++)
    {
        for (int j = 0; j < d; j++)
        {
            // Print an extra space if there is only one character
            if (board[i][j] < 10)
            {
                // If it's 0 print _
                if (board[i][j] == 0)
                {
                    // Update the position of the empthy tile
                    blank_pos[0] = i;
                    blank_pos[1] = j;
                    printf("  _ ");
                }
                // Otherwise print it as it is
                else
                {
                    printf("  %i ",board[i][j]);    
                }
            }
            else
            {
                printf(" %i ",board[i][j]);
            }
        }
        printf("\n\n");
    }
}

void get_pos(int tile)
{
    // Get the position of the tiles
    for (int i = 0; i < d; i++)
    {
        for (int j = 0; j < d; j++)
        {
            if (board[i][j] == tile)
            {
                tile_pos[0] = i;
                tile_pos[1] = j;
            }
            if (board[i][j] == 0)
            {
                blank_pos[0] = i;
                blank_pos[1] = j;
            }
        }
    }
}

void switch_tiles()
{
    // Backup the value of the selected tile
    int aux = board[tile_pos[0]][tile_pos[1]];
    // Replace selected tile with 0
    board[tile_pos[0]][tile_pos[1]] = 0;
    // Replace the ex 0 tile with the backup of selected one
    board[blank_pos[0]][blank_pos[1]] = aux;
}

/**
 * If tile borders empty space, moves tile and returns true, else
 * returns false. 
 */
bool move(int tile)
{
    // Is the tile on the table?
    if ( (tile <= 0) || (tile > (d * d - 1)))
    {
        printf("Tile not found on the table");
        return false;
    }
    else
    {
        get_pos(tile);
        int itile = tile_pos[0];
        int jtile = tile_pos[1];
        int iblank = blank_pos[0];
        int jblank = blank_pos[1];
        // If the selected tile is at the bottom of the blank
        if ((itile == iblank + 1) && (jtile == jblank))
        {
            switch_tiles();
        }
        // If the selected tile is at the top of the blank
        else if ((itile == iblank - 1) && (jtile == jblank))
        {
            switch_tiles();
        }
        // If the selected tile at the left of the blank
        else if ((itile == iblank) && (jtile == jblank - 1))
        {
            switch_tiles();
        }
        // If the selected tile at right of the blank
        else if ((itile == iblank) && (jtile == jblank + 1))
        {
            switch_tiles();
        }
        else
        {
            printf("The tile selected is not adjacent with the blank one.");
        }
        usleep(200000);
        return true;
    }
}

/**
 * Returns true if game is won (i.e., board is in winning configuration), 
 * else false.
 */
bool won(void)
{
    int previous = 0;
    for (int i = 0; i < d; i++)
    {
        for (int j = 0; j < d; j++)
        {
            // Condition to win is all numbers to be
            // Larger than previous
            if ((board[i][j]) < previous) 
            {
                // Ignore 0 value (blank)
                if (board[i][j] == 0)
                {
                }
                else
                {
                    return false;
                }
            }
            if (!board[i][j] == 0)
            {
                previous = board[i][j];    
            }
            else 
            {
                previous = 100;
            }
        }
    }
    return true;
}

