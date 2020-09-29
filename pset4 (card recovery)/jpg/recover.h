#include <stdint.h>

typedef uint8_t  BYTE;

typedef struct
{
    BYTE  byte1;
    BYTE  byte2;
    BYTE  byte3;
    BYTE  byte4;
} __attribute__((__packed__))
firstBytes;