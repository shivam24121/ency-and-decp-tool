public class CaesarCipher {

    public static String encryptCaesar(String text, int shift) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < text.length(); i++) {
            char charAt = text.charAt(i);
            if (Character.isUpperCase(charAt)) {
                result.append((char) ((charAt - 'A' + shift) % 26 + 'A'));
            } else if (Character.isLowerCase(charAt)) {
                result.append((char) ((charAt - 'a' + shift) % 26 + 'a'));
            } else {
                result.append(charAt); // Non-alphabetic characters are not encrypted
            }
        }
        return result.toString();
    }

    public static String decryptCaesar(String text, int shift) {
        return encryptCaesar(text, 26 - shift); // Decrypting is just reversing the shift
    }

    public static void main(String[] args) {
        String text = "Hello World";
        int shift = 3;

        String encrypted = encryptCaesar(text, shift);
        System.out.println("Encrypted: " + encrypted);

        String decrypted = decryptCaesar(encrypted, shift);
        System.out.println("Decrypted: " + decrypted);
    }
}

public class VigenereCipher {

    public static String encryptVigenere(String text, String key) {
        StringBuilder result = new StringBuilder();
        int j = 0;

        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            if (Character.isLetter(c)) {
                char base = Character.isUpperCase(c) ? 'A' : 'a';
                char keyChar = key.charAt(j % key.length());
                int shift = Character.toLowerCase(keyChar) - 'a';
                result.append((char) ((c - base + shift) % 26 + base));
                j++;
            } else {
                result.append(c); // Non-alphabetic characters remain unchanged
            }
        }
        return result.toString();
    }

    public static String decryptVigenere(String text, String key) {
        StringBuilder result = new StringBuilder();
        int j = 0;

        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            if (Character.isLetter(c)) {
                char base = Character.isUpperCase(c) ? 'A' : 'a';
                char keyChar = key.charAt(j % key.length());
                int shift = Character.toLowerCase(keyChar) - 'a';
                result.append((char) ((c - base - shift + 26) % 26 + base));
                j++;
            } else {
                result.append(c); // Non-alphabetic characters remain unchanged
            }
        }
        return result.toString();
    }

    public static void main(String[] args) {
        String text = "Hello World";
        String key = "KEY";

        String encrypted = encryptVigenere(text, key);
        System.out.println("Encrypted: " + encrypted);

        String decrypted = decryptVigenere(encrypted, key);
        System.out.println("Decrypted: " + decrypted);
    }
}

public class RailFenceCipher {

    public static String encryptRailFence(String text, int rails) {
        if (rails <= 1) return text; // No encryption needed for 1 rail

        char[] rail = new char[text.length()];
        int len = text.length();
        boolean dirDown = false;
        int row = 0;

        for (int i = 0; i < len; i++) {
            rail[row] = text.charAt(i);

            if (row == 0 || row == rails - 1) {
                dirDown = !dirDown;
            }

            row += dirDown ? 1 : -1;
        }

        return new String(rail);
    }

    public static String decryptRailFence(String text, int rails) {
        if (rails <= 1) return text; // No decryption needed for 1 rail

        char[] rail = new char[text.length()];
        int len = text.length();
        boolean dirDown = false;
        int row = 0;

        for (int i = 0; i < len; i++) {
            rail[row] = text.charAt(i);

            if (row == 0 || row == rails - 1) {
                dirDown = !dirDown;
            }

            row += dirDown ? 1 : -1;
        }

        return new String(rail);
    }

    public static void main(String[] args) {
        String text = "Hello World";
        int rails = 3;

        String encrypted = encryptRailFence(text, rails);
        System.out.println("Encrypted: " + encrypted);

        String decrypted = decryptRailFence(encrypted, rails);
        System.out.println("Decrypted: " + decrypted);
    }
}
