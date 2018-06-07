/* eslint-disable */
export default {
  install: (vue, options) => {
    vue.prototype.base64 = {
      // private method for UTF-8 encoding
      _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);
          if (c < 128) {
            utftext += String.fromCharCode(c);
          } else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
          } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
          }

        }
        return utftext;
      },

      // private method for UTF-8 decoding
      _utf8_decode: function (utftext) {
        var c, c1, c2, string = "",
          i = 0;
        c = c1 = c2 = 0;
        while (i < utftext.length) {
          c = utftext.charCodeAt(i);
          if (c < 128) {
            string += String.fromCharCode(c);
            i++;
          } else if ((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
          } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
          }
        }
        return string;
      },

      // public method for encoding
      encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this._utf8_encode(input);
        while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;
          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }
          output = output +
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
      },

      // public method for decoding
      decode: function (str) {
        let c1, c2, c3, c4;
        let base64DecodeChars = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57,
          58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6,
          7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
          25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
          37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
        ];
        let i = 0,
          len = str.length,
          string = '';

        while (i < len) {
          do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
          } while (
            i < len && c1 == -1
          );

          if (c1 == -1) break;

          do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
          } while (
            i < len && c2 == -1
          );

          if (c2 == -1) break;

          string += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

          do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
              return string;

            c3 = base64DecodeChars[c3]
          } while (
            i < len && c3 == -1
          );

          if (c3 == -1) break;

          string += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

          do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61) return string;
            c4 = base64DecodeChars[c4]
          } while (
            i < len && c4 == -1
          );

          if (c4 == -1) break;

          string += String.fromCharCode(((c3 & 0x03) << 6) | c4)
        }
        return string;
      }
    }
  },
}
/* eslint-disable */
