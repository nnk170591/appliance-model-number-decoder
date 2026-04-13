/**
 * Model number patterns for SHORT queries (4-10 chars)
 * Long queries (11+ chars with letters+digits) are checked directly against DB
 */
export const MODEL_PATTERNS = [
  // Standard: 2-4 letters + 4+ digits + optional suffix
  // Examples: WED5220RW0, WFW5620HW
  /^[A-Z]{2,4}\d{4,}[A-Z0-9]{0,5}$/i,

  // Y-prefix models (dryers)
  // Examples: YWED5220RW0
  /^Y[A-Z]{2,3}\d{4,}[A-Z0-9]{0,5}$/i,

  // Digit-first models
  // Examples: 5KSM195PSAER6, 1021B46
  /^\d[A-Z]{2,4}\d{2,}[A-Z0-9]{0,6}$/i,
  /^\d{3,}[A-Z]\d{2,}$/i,
  /^\d{4}[A-Z]\d[A-Z]$/i,

  // Single letter + digits + suffix
  // Examples: W27200WC, A9900XVW
  /^[A-Z]\d{4,}[A-Z0-9]{0,4}$/i,

  // Bosch B-series
  // Examples: B18ID80NLP
  /^B\d{2}[A-Z]{2}\d{2,}[A-Z]{2,4}\d{0,2}$/i,

  // Short mixed patterns (4-10 chars)
  /^[A-Z]\d{3}[A-Z]{2}$/i,           // C272BW
  /^[A-Z]{2,3}\d{2,3}[A-Z]{2}$/i,    // CM302BB, GDG31CT
  /^[A-Z]{2}\d{2}[A-Z]\d{3}$/i,      // HF36V306
  /^[A-Z]{2}\d{2}[A-Z]\d[A-Z]$/i,    // CT21Y7A
  /^[A-Z]{3,6}\d{1,2}$/i,            // MBBW01, FMR3
  /^[A-Z]{2}\d{2}[A-Z]{3,4}$/i,      // TB12SCBR
  /^[A-Z]\d{3}$/i,                   // A112
  /^[A-Z]\d{2}[A-Z]$/i,              // M08B
  /^[A-Z]\d[A-Z]\d$/i,               // B9D0
  /^[A-Z]{2}\d{2}$/i,                // CF05

  // LG patterns: 3L + 3D + 2-3L + optional digit
  /^[A-Z]{3}\d{3}[A-Z]{2,3}\d?$/i,    // LSU180HEV, LSU091HSV3

  // 2L + 2D + L + 2D + L pattern
  /^[A-Z]{2}\d{2}[A-Z]\d{2}[A-Z]$/i,  // CP18G30A, UE08D11C

  // L + 2D + 2-3L + optional suffix
  /^[A-Z]\d{2}[A-Z]{2,4}[A-Z0-9]{0,3}$/i, // R18AWN, P24RK

  // Mixed: 2-3L + 2D + L + D + L
  /^[A-Z]{2,3}\d{2}[A-Z]\d[A-Z]$/i,   // MRH12Y3J, DNT18H9

  // 4D + 3L (very common)
  /^\d{4}[A-Z]{3}$/i,                 // 9222XUB, 3512WPL, 3524SPA

  // 4D + 2L + D
  /^\d{4}[A-Z]{2}\d$/i,               // 1178WA6

  // 2L + 2D + 2L + D
  /^[A-Z]{2}\d{2}[A-Z]{2}\d$/i,       // AD40LJ2, DG30MC1

  // 3-4L + 3D + optional L
  /^[A-Z]{3,4}\d{3}[A-Z]?$/i,         // LCRE200, CCE407W, KWE200A

  // 3L + 2D + L + D
  /^[A-Z]{3}\d{2}[A-Z]\d$/i,          // SVU80W1, SWF90W1, CNT17R4

  // 2D + 2L + D + L
  /^\d{2}[A-Z]{2}\d[A-Z]$/i,          // 82HN1K, 83LN1K, 16TW3B

  // L + 2D + L + D + L
  /^[A-Z]\d{2}[A-Z]\d[A-Z]$/i,        // M41C6P, M15C3B

  // 3L + D + 2L + D
  /^[A-Z]{3}\d[A-Z]{2}\d$/i,          // KSB5BK4

  // L + 3D + 3L
  /^[A-Z]\d{3}[A-Z]{3}$/i,            // W207KAC

  // 2L + D + 3L + D
  /^[A-Z]{2}\d[A-Z]{3}\d$/i,          // CA5WMK0, CA6WMR2

  // 4L + 2D + L
  /^[A-Z]{4}\d{2}[A-Z]$/i,            // ERSW24B

  // 3L + D + L + D + L
  /^[A-Z]{3}\d[A-Z]\d[A-Z]$/i,        // CEW3D3D

  // 2D + 2L + 2D
  /^\d{2}[A-Z]{2}\d{2}$/i,            // 11HN10, 15HY10, 81FN12

  // 2L + D + 2L + 2D
  /^[A-Z]{2}\d[A-Z]{2}\d{2}$/i,       // CA6WM41, CA5WM45

  // 2L + 3D + L + D (very common)
  /^[A-Z]{2}\d{3}[A-Z]\d$/i,          // TC507B1, RA123A0, DH400K0

  // 2L + 3D + L
  /^[A-Z]{2}\d{3}[A-Z]$/i,            // CM200E

  // 3L + 2D + L
  /^[A-Z]{3}\d{2}[A-Z]$/i,            // ESU13L, RMC30A, MRT11A

  // D + 3L + D + L + D
  /^\d[A-Z]{3}\d[A-Z]\d$/i,           // 3CSE3W1, 7CSE3A1

  // 4L + D + 2L
  /^[A-Z]{4}\d[A-Z]{2}$/i,            // CFCH5AS, CHCH8WE, CEFH5AE

  // 3D + 3L
  /^\d{3}[A-Z]{3}$/i,                 // 570AHK, 653AHV

  // 5D + L
  /^\d{5}[A-Z]$/i,                    // 89890C

  // 3L + D + 3L
  /^[A-Z]{3}\d[A-Z]{3}$/i,            // KHM5TWH, CCH9WSK

  // L + 2D + L + 2D
  /^[A-Z]\d{2}[A-Z]\d{2}$/i,          // M71B10

  // 2L + D + L + 2D
  /^[A-Z]{2}\d[A-Z]\d{2}$/i,          // DU7A01, DU1A03

  // 2L + 2D + L + D
  /^[A-Z]{2}\d{2}[A-Z]\d$/i,          // DU35A1

  // L + 3D + L + D
  /^[A-Z]\d{3}[A-Z]\d$/i,             // A121B8

  // 2D + L + D + 2L
  /^\d{2}[A-Z]\d[A-Z]{2}$/i,          // 91F4KX

  // 2L + D + L + 2L
  /^[A-Z]{2}\d[A-Z][A-Z]{2}$/i,       // CD9BAG

  // D + L + D + 4L
  /^\d[A-Z]\d[A-Z]{4}$/i,             // 7K5SSWH, 5K5SSWH

  // L + 2D + L + D + 2L
  /^[A-Z]\d{2}[A-Z]\d[A-Z]{2}$/i,     // W25D6HW, W26D6HW

  // 4L + D + L + D
  /^[A-Z]{4}\d[A-Z]\d$/i,             // AKDG1E2, CFCB4S2

  // 5L + D + L
  /^[A-Z]{5}\d[A-Z]$/i,               // CAKDH5E, CAKDE5E

  // 2L + D + L + 2D + L
  /^[A-Z]{2}\d[A-Z]\d{2}[A-Z]$/i,     // AK2T35W, AK2T30E

  // 2L + 2D + L + 2D
  /^[A-Z]{2}\d{2}[A-Z]\d{2}$/i,       // NT15H41, NT21E63

  // D + 4L + D + L
  /^\d[A-Z]{4}\d[A-Z]$/i,             // 3CTBE4A, 3CTUE4A

  // D + 5L + D
  /^\d[A-Z]{5}\d$/i,                  // 3ECKMF9

  // L + D + 4L + D
  /^[A-Z]\d[A-Z]{4}\d$/i,             // K4SSWH0

  // D + 6L
  /^\d[A-Z]{6}$/i,                    // 5KSMSIA

  // 6D + L
  /^\d{6}[A-Z]$/i,                    // 849200A, 849500A

  // 3L + D + L + 2D
  /^[A-Z]{3}\d[A-Z]\d{2}$/i,          // CGW2D21, CGA2D21

  // 2D + 4L + D
  /^\d{2}[A-Z]{4}\d$/i,               // 95LEGB5

  // 2L + D + 2L + D
  /^[A-Z]{2}\d[A-Z]{2}\d$/i,          // FL8AW1

  // 2D + 2L + D + 2L
  /^\d{2}[A-Z]{2}\d[A-Z]{2}$/i,       // 85RB3BT, 31HB3KX

  // 8-char patterns
  // 3L + 3D + L + D
  /^[A-Z]{3}\d{3}[A-Z]\d$/i,          // SXF530W1, SXC200W2

  // 3L + 2D + 2L + D
  /^[A-Z]{3}\d{2}[A-Z]{2}\d$/i,       // KSM88BU0, KSM97TZ0

  // 4L + D + 2L + D
  /^[A-Z]{4}\d[A-Z]{2}\d$/i,          // CFCS4WE2, CEFS5AE4

  // D + 6L + D
  /^\d[A-Z]{6}\d$/i,                  // 5KSMICM0

  // 5D + 3L
  /^\d{5}[A-Z]{3}$/i,                 // 31315XAA, 31203WAW

  // 2L + 2D + L + D + 2L
  /^[A-Z]{2}\d{2}[A-Z]\d[A-Z]{2}$/i,  // CW18P2WC

  // 2L + 2D + 2L + 2D
  /^[A-Z]{2}\d{2}[A-Z]{2}\d{2}$/i,    // CA18WC90

  // 2L + 3D + 3L
  /^[A-Z]{2}\d{3}[A-Z]{3}$/i,         // RB184PDV

  // 2L + 2D + 3L + D
  /^[A-Z]{2}\d{2}[A-Z]{3}\d$/i,       // CA15WCL0

  // 2L + 2D + 2L + D + L
  /^[A-Z]{2}\d{2}[A-Z]{2}\d[A-Z]$/i,  // YG20FA4K

  // 3L + 2D + 3L
  /^[A-Z]{3}\d{2}[A-Z]{3}$/i,         // LDG30CMD, KDI16WSC, JBQ30BAM

  // 4L + D + 3L
  /^[A-Z]{4}\d[A-Z]{3}$/i,            // CECH8WES

  // 3D + 4L
  /^\d{3}[A-Z]{4}$/i,                 // 958WJZW, 653WJHV

  // 2D + L + 3D
  /^\d{2}[A-Z]\d{3}$/i,               // 84B800

  // 2L + 3D + 2L + D
  /^[A-Z]{2}\d{3}[A-Z]{2}\d$/i,       // AD040SG0, JZ235PS0

  // 3L + D + L + D + 2L
  /^[A-Z]{3}\d[A-Z]\d[A-Z]{2}$/i,     // CGA3D5XK, CGW3D5VK

  // 3L + D + 3L + D (very common)
  /^[A-Z]{3}\d[A-Z]{3}\d$/i,          // KHM9PSY5, KSM1CBL0

  // L + 2D + L + 2D + L
  /^[A-Z]\d{2}[A-Z]\d{2}[A-Z]$/i,     // M15B10P, M15E10P

  // 2L + D + L + 2D + L + D
  /^[A-Z]{2}\d[A-Z]\d{2}[A-Z]\d$/i,   // AK2T36E2, AK2H30W1

  // 2D + L + 2D + 3L
  /^\d{2}[A-Z]\d{2}[A-Z]{3}$/i,       // 61S04PAA

  // 4D + L + D
  /^\d{4}[A-Z]\d$/i,                  // 1198B6, 1198C6

  // 2L + 3D + L + 2D
  /^[A-Z]{2}\d{3}[A-Z]\d{2}$/i,       // AC110B14

  // D + L + D + 4L + D
  /^\d[A-Z]\d[A-Z]{4}\d$/i,           // 4K5SSOB0

  // 7L + D
  /^[A-Z]{7}\d$/i,                    // KSMFVSP0

  // 2D + 2L + 2D + L
  /^\d{2}[A-Z]{2}\d{2}[A-Z]$/i,       // 31FK92W, 31FA92W, 11JY10K

  // D + 5L + 2D
  /^\d[A-Z]{5}\d{2}$/i,               // 4ECKMF87

  // L + D + L + D + L + D
  /^[A-Z]\d[A-Z]\d[A-Z]\d$/i,         // M5B6B9, M5C1W3

  // 5L + 3D
  /^[A-Z]{5}\d{3}$/i,                 // ECKMF831

  // D + 3L + D + 2L + D
  /^\d[A-Z]{3}\d[A-Z]{2}\d$/i,        // 4KSB5WW4

  // 2D + L + D + 3L
  /^\d{2}[A-Z]\d[A-Z]{3}$/i,          // 91F4KVW

  // 4L + 2D + 2L
  /^[A-Z]{4}\d{2}[A-Z]{2}$/i,         // CEFH10WE, ESUF20HW

  // 4L + 2D + L + D
  /^[A-Z]{4}\d{2}[A-Z]\d$/i,          // ICNS22F9

  // 2L + D + 4L + D
  /^[A-Z]{2}\d[A-Z]{4}\d$/i,          // CA5WMVK0, CA5WMVL0

  // L + 3D + 4L
  /^[A-Z]\d{3}[A-Z]{4}$/i,            // H675PRRS, H675NRRT

  // 3L + D + 2L + 2D
  /^[A-Z]{3}\d[A-Z]{2}\d{2}$/i,       // RSB2TK24, CAH8WB42

  // 2L + D + L + 2D + 2L
  /^[A-Z]{2}\d[A-Z]\d{2}[A-Z]{2}$/i,  // AK2H30HR, AK2H35HR

  // 3L + D + L + 2D + L
  /^[A-Z]{3}\d[A-Z]\d{2}[A-Z]$/i,     // CAK2T30W, CAK2H30E

  // 2L + D + L + 3D + L
  /^[A-Z]{2}\d[A-Z]\d{3}[A-Z]$/i,     // AK2H300W, AK2H300E

  // 5L + D + 2L
  /^[A-Z]{5}\d[A-Z]{2}$/i,            // CAKDE5WW

  // L + D + L + D + 2L
  /^[A-Z]\d[A-Z]\d[A-Z]{2}$/i,        // M5C6RM, M5E1RM

  // D + L + 2D + 4L
  /^\d[A-Z]\d{2}[A-Z]{4}$/i,          // 7K45SSWH, 5K45SSWH

  // L + D + L + 2D + L + 2D
  /^[A-Z]\d[A-Z]\d{2}[A-Z]\d{2}$/i,   // A0W23W10, A0W22W12

  // 3L + 2D + L + 2D
  /^[A-Z]{3}\d{2}[A-Z]\d{2}$/i,       // CAH12W04, ADW23L10

  // 2L + D + L + 3L
  /^[A-Z]{2}\d[A-Z][A-Z]{3}$/i,       // DU5JCAN, DU2JCAN

  // 4D + 2L
  /^\d{4}[A-Z]{2}$/i,                 // 2453AA

  // 2D + 5L + D
  /^\d{2}[A-Z]{5}\d$/i,               // 51IMWEX1

  // 3L + D + 4L
  /^[A-Z]{3}\d[A-Z]{4}$/i,            // KHM5TBWH

  // 3D + 5L
  /^\d{3}[A-Z]{5}$/i,                 // 654ADHVW, 958AFCLZ

  // 2D + 2L + D + 3L
  /^\d{2}[A-Z]{2}\d[A-Z]{3}$/i,       // 38HN4TXW

  // 9-char patterns
  // 3L + D + 4L + D
  /^[A-Z]{3}\d[A-Z]{4}\d$/i,          // KHM5APER5

  // 4L + 2D + 2L + D
  /^[A-Z]{4}\d{2}[A-Z]{2}\d$/i,       // CHCS51AE2

  // 3L + 2D + 3L + D
  /^[A-Z]{3}\d{2}[A-Z]{3}\d$/i,       // EWV16BWR1, TMH16XSQ3

  // 2L + 3D + 4L
  /^[A-Z]{2}\d{3}[A-Z]{4}$/i,         // RB172PLFW, HV630CORT

  // 2L + 2D + 4L + D
  /^[A-Z]{2}\d{2}[A-Z]{4}\d$/i,       // HX50PQRT2

  // 9-char patterns (additional)
  // 2L + 3D + 3L + D (very common)
  /^[A-Z]{2}\d{3}[A-Z]{3}\d$/i,       // RB160PXL4, RB266PXV1, RS575PXR0, SB130PEK0

  // 4L + 3D + L + D (very common)
  /^[A-Z]{4}\d{3}[A-Z]\d$/i,          // KUCS180S0, KBDS250X3, KUDI220T3, KHMS105S0

  // 3L + 2D + L + D + 2L
  /^[A-Z]{3}\d{2}[A-Z]\d[A-Z]{2}$/i,  // CDG20P7AC, DNT18F9LA, DNT22H9LH, CDE22B6VC

  // 3L + 2D + L + D + L + D
  /^[A-Z]{3}\d{2}[A-Z]\d[A-Z]\d$/i,   // CAW13E1A1, CAW12D2A1, CAW10C1A1, CET08E1A1

  // 3L + 2D + 4L
  /^[A-Z]{3}\d{2}[A-Z]{4}$/i,         // KSM90PSBU

  // 4L + 3D + 2L
  /^[A-Z]{4}\d{3}[A-Z]{2}$/i,         // CARR629WW

  // 2L + 2D + L + D + L + 2D
  /^[A-Z]{2}\d{2}[A-Z]\d[A-Z]\d{2}$/i, // CB19G7B13

  // 5D + 4L
  /^\d{5}[A-Z]{4}$/i,                 // 31000PAWD

  // 2L + 2D + L + 2D + 2L
  /^[A-Z]{2}\d{2}[A-Z]\d{2}[A-Z]{2}$/i, // NT15H43GH

  // D + 3L + D + 3L + D
  /^\d[A-Z]{3}\d[A-Z]{3}\d$/i,        // 5KSM2FPA0

  // 4L + 2D + L + D + L
  /^[A-Z]{4}\d{2}[A-Z]\d[A-Z]$/i,     // ICNS28D9F, PINT22F9H

  // 2L + 2D + L + D + 3L
  /^[A-Z]{2}\d{2}[A-Z]\d[A-Z]{3}$/i,  // NT23B8SVH

  // 5L + 3D + L
  /^[A-Z]{5}\d{3}[A-Z]$/i,            // JRSDE247W

  // 2L + D + L + 3D + 2L
  /^[A-Z]{2}\d[A-Z]\d{3}[A-Z]{2}$/i,  // AR2T661WW

  // 4L + D + 2L + 2D
  /^[A-Z]{4}\d[A-Z]{2}\d{2}$/i,       // CEFS5WE31

  // 8-char patterns (additional)
  // 2D + 2L + 2D + 2L
  /^\d{2}[A-Z]{2}\d{2}[A-Z]{2}$/i,    // 31HN92KW, 31HN92LW, 31FA92KW

  // 4D + 4L
  /^\d{4}[A-Z]{4}$/i,                 // 3100PPAK, 3468XTWX

  // 7-char patterns
  // 2D + 2L + D + 2D
  /^\d{2}[A-Z]{2}\d{3}$/i,            // 15GA194

  // 5-char patterns
  // 2L + 2D + L
  /^[A-Z]{2}\d{2}[A-Z]$/i,            // CI88C

  // 9-char patterns (batch 2)
  // 3L + D + L + D + 3L
  /^[A-Z]{3}\d[A-Z]\d[A-Z]{3}$/i,     // CEW3D5DLX, CGA6C5GWK

  // 2L + 2D + 2L + D + 2L
  /^[A-Z]{2}\d{2}[A-Z]{2}\d[A-Z]{2}$/i, // RB21KN4AF, RB15FN2AF, RB23GY3PW

  // 4L + D + 4L
  /^[A-Z]{4}\d[A-Z]{4}$/i,            // CHTS6AECP

  // 4L + 2D + 3L
  /^[A-Z]{4}\d{2}[A-Z]{3}$/i,         // KSMC50SPL

  // 3L + D + L + 2D + 2L
  /^[A-Z]{3}\d[A-Z]\d{2}[A-Z]{2}$/i,  // CAK2H30HR

  // 3D + 6L
  /^\d{3}[A-Z]{6}$/i,                 // 675AKKLVW, 666WJESVW, 676AMKSVW

  // 3L + 2D + 2L + D + L
  /^[A-Z]{3}\d{2}[A-Z]{2}\d[A-Z]$/i,  // RNC20CN2A, RND24AA3A, BLT74LN5T

  // 4D + 5L
  /^\d{4}[A-Z]{5}$/i,                 // 3121XRWUX, 1365HWEZW

  // 2D + 2L + D + 4L
  /^\d{2}[A-Z]{2}\d[A-Z]{4}$/i,       // 34FN2CKXW, 41EA3GKLW

  // 4D + 2L + 2D + L
  /^\d{4}[A-Z]{2}\d{2}[A-Z]$/i,       // 1171WF36K

  // L + 2D + 2L + D + 3L
  /^[A-Z]\d{2}[A-Z]{2}\d[A-Z]{3}$/i,  // B34GA2CKW, U31FY8KLW, S68HA3CXW

  // L + 2D + 2L + 2D + 2L
  /^[A-Z]\d{2}[A-Z]{2}\d{2}[A-Z]{2}$/i, // S31FA92KX

  // 2D + 2L + 2D + 3L
  /^\d{2}[A-Z]{2}\d{2}[A-Z]{3}$/i,    // 31FS92KLW

  // 3L + 2D + 2L + 2D
  /^[A-Z]{3}\d{2}[A-Z]{2}\d{2}$/i,    // CDC81DA01

  // D + 4L + D + 2L + D
  /^\d[A-Z]{4}\d[A-Z]{2}\d$/i,        // 5KICA0WH0

  // 8-char patterns (batch 2)
  // L + 2D + L + D + 3L
  /^[A-Z]\d{2}[A-Z]\d[A-Z]{3}$/i,     // B59F5TXW

  // 2D + L + D + 4L
  /^\d{2}[A-Z]\d[A-Z]{4}$/i,          // 97F4EXWW

  // 2L + 2D + L + D + L + D
  /^[A-Z]{2}\d{2}[A-Z]\d[A-Z]\d$/i,   // KV25H0X3

  // 2L + D + 5L
  /^[A-Z]{2}\d[A-Z]{5}$/i,            // DU4JVCAN

  // L + 2D + L + D + 2L + D
  /^[A-Z]\d{2}[A-Z]\d[A-Z]{2}\d$/i,   // M15C8PW9, M41C6PX9

  // 2D + 2L + D + L + 2D
  /^\d{2}[A-Z]{2}\d[A-Z]\d{2}$/i,     // 41EG2W30

  // 7-char patterns (batch 2)
  // L + D + L + D + 2L + D
  /^[A-Z]\d[A-Z]\d[A-Z]{2}\d$/i,      // M5C1CC1

  // L + 2D + L + D + L + D
  /^[A-Z]\d{2}[A-Z]\d[A-Z]\d$/i,      // M41D6X9

  // Final batch patterns
  // 3L + 3D + L + 2D
  /^[A-Z]{3}\d{3}[A-Z]\d{2}$/i,        // MHB100D36

  // 2L + 3D + L + 2D + L
  /^[A-Z]{2}\d{3}[A-Z]\d{2}[A-Z]$/i,   // HA100A30D

  // D + L + 2D + 4L + D
  /^\d[A-Z]\d{2}[A-Z]{4}\d$/i,         // 5K45SSWH0

  // 2L + 3D + 2L + 2D
  /^[A-Z]{2}\d{3}[A-Z]{2}\d{2}$/i,     // DU120CA20, DU120DA25

  // 2D + 2L + 4D
  /^\d{2}[A-Z]{2}\d{4}$/i,             // 35HA1002

  // 2D + 2L + D + 2L + 2D
  /^\d{2}[A-Z]{2}\d[A-Z]{2}\d{2}$/i,   // 31FN8LW02, 31JA2KW30

  // 2D + 2L + 2D + L + 2D
  /^\d{2}[A-Z]{2}\d{2}[A-Z]\d{2}$/i,   // 31FY92W30, 31FN10K49, 35HN92W94

  // L + 2D + 2L + D + L + 2D
  /^[A-Z]\d{2}[A-Z]{2}\d[A-Z]\d{2}$/i, // U83EY1G11, U31FK7W04

  // L + 2D + L + 2D + 2L + D
  /^[A-Z]\d{2}[A-Z]\d{2}[A-Z]{2}\d$/i, // M41B10PW6, M15B10PX9
]
