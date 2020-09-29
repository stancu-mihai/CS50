/**
 * copy.c
 *
 * Computer Science 50
 * Problem Set 4
 *
 * Copies a BMP piece by piece, just because.
 */
       
#include <stdio.h>
#include <stdlib.h>

#include "bmp.h"

int main(int argc, char* argv[])
{
    // ensure proper usage
    if (argc != 4)
    {
        printf("Usage: ./resize scale infile outfile\n");
        return 1;
    }

    // remember filenames
    int scale = atoi(argv[1]);
    char* infile = argv[2];
    char* outfile = argv[3];

    // open input file 
    FILE* inptr = fopen(infile, "r");
    if (inptr == NULL)
    {
        printf("Could not open %s.\n", infile);
        return 2;
    }

    // open output file
    FILE* outptr = fopen(outfile, "w");
    if (outptr == NULL)
    {
        fclose(inptr);
        fprintf(stderr, "Could not create %s.\n", outfile);
        return 3;
    }

    // read infile's BITMAPFILEHEADER
    BITMAPFILEHEADER bf1;
    fread(&bf1, sizeof(BITMAPFILEHEADER), 1, inptr);

    // read infile's BITMAPINFOHEADER
    BITMAPINFOHEADER bi1;
    fread(&bi1, sizeof(BITMAPINFOHEADER), 1, inptr);
    
    // Define outfile's BITMAPFILEHEADER
    BITMAPFILEHEADER bf2;
    bf2.bfOffBits = bf1.bfOffBits;
    bf2.bfReserved1 = bf1.bfReserved1;
    bf2.bfReserved2 = bf1.bfReserved2;
    bf2.bfSize = bf1.bfSize;
    bf2.bfType = bf1.bfType;
    
    // Define outfile's BITMAPINFOHEADER
    BITMAPINFOHEADER bi2;
    bi2.biBitCount = bi1.biBitCount;
    bi2.biClrImportant = bi1.biClrImportant;
    bi2.biClrUsed = bi1.biClrUsed;
    bi2.biCompression = bi1.biCompression;
    bi2.biHeight = bi1.biHeight;
    bi2.biPlanes = bi1.biPlanes;
    bi2.biSize = bi1.biSize;
    bi2.biSizeImage = bi1.biSizeImage;
    bi2.biWidth = bi1.biWidth;
    bi2.biXPelsPerMeter = bi1.biXPelsPerMeter;
    bi2.biYPelsPerMeter = bi1.biYPelsPerMeter;

    // ensure infile is (likely) a 24-bit uncompressed BMP 4.0
    if (bf1.bfType != 0x4d42 || bf1.bfOffBits != 54 || bi1.biSize != 40 || 
        bi1.biBitCount != 24 || bi1.biCompression != 0)
    {
        fclose(outptr);
        fclose(inptr);
        fprintf(stderr, "Unsupported file format.\n");
        return 4;
    }

    // Modify the header for output file
    bi2.biWidth = bi1.biWidth * scale;  
    bi2.biHeight = bi1.biHeight * scale;
    
    // determine padding for scanlines (infile)
    int padding1 =  (4 - (bi1.biWidth * sizeof(RGBTRIPLE)) % 4) % 4;
    
    // determine padding for scanlines (outfile)
    int padding2 =  (4 - (bi2.biWidth * sizeof(RGBTRIPLE)) % 4) % 4;
    
    // Compute SizeImage
    bi2.biSizeImage = (bi2.biWidth * sizeof(RGBTRIPLE) + padding2) 
                      * abs(bi2.biHeight);
    
    // Compute new bfsize (file size)
    bf2.bfSize = 54 + bi2.biSizeImage;
    
    // write outfile's BITMAPFILEHEADER
    fwrite(&bf2, sizeof(BITMAPFILEHEADER), 1, outptr);

    // write outfile's BITMAPINFOHEADER
    fwrite(&bi2, sizeof(BITMAPINFOHEADER), 1, outptr);

    // iterate over infile's scanlines
    for (int i = 0, biHeight = abs(bi1.biHeight); i < biHeight; i++)
    {
        // resize vertically
        for (int j = 0; j < scale ; j++)
        {
            // Get infile start line position
            fpos_t position;
            fgetpos(inptr, &position);
            
             // iterate over pixels in infile's scanline
            for (int k = 0; k < bi1.biWidth; k++)
            {
                 // temporary storage
                RGBTRIPLE triple;

                // read RGB triple from infile
                fread(&triple, sizeof(RGBTRIPLE), 1, inptr);

                // write "scale" number of pixels
                for (int l1 = 0; l1 < scale; l1++)
                {
                    // write RGB triple to outfile
                    fwrite(&triple, sizeof(RGBTRIPLE), 1, outptr);    
                }
            }
            // Unless this is the (scale)th copy of the inline
            if ( j < scale - 1)
            {
                // Move the current position of infile to start a new row
                fsetpos(inptr, &position);
            }
            else
            {
                // skip over infile's padding, if any
                fseek(inptr, padding1, SEEK_CUR);
            }
            // Add outfile's padding if necessary
            for (int k = 0; k < padding2; k++)
            {
                fputc(0x00, outptr);
            }
        }
    }

    // close infile
    fclose(inptr);

    // close outfile
    fclose(outptr);

    // that's all folks
    return 0;
}
