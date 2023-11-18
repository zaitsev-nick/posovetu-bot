import axios from 'axios';
import crypto from 'crypto';

/**
 * Check the status of Kuna code.
 *
 * @param {String} code - Kuna code
 * Kuna code structure: 857ny-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-KUN-KCode
 */
const checkKuna = async (code) => {
  try {
    if (code) {
      // We need only 5 first symbols from Kuna Code
      const result = await axios({
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        url: `https://api.kuna.io/v3/kuna_codes/${code.substring(0, 5)}/check`,
      });
      return result.data;
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Redeem code.
 *
 * @param {String} code - Kuna code
 * Kuna code structure: 857ny-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-KUN-KCode
 */
const redeemKuna = async (code) => {
  try {
    // Public key
    const apiKey = 'ziGBTYKxYt7jwCLqvi6Sogs0wtHDSBjsnaelKVby';
    // Secret key
    const apiSecret = 'dVpPBb3C8Oanek4MaO8BIQzhQxnxfwcEvvRZopDE';
    const apiPath = '/v3/auth/kuna_codes/redeem';
    const url = 'https://api.kuna.io/v3/auth/kuna_codes/redeem';
    const nonce = new Date().getTime();
    const body = { code: code };
    const signatureString = `${apiPath}${nonce}${JSON.stringify(body)}`;
    const shex = crypto
      .createHmac('sha384', apiSecret)
      .update(signatureString)
      .digest('hex');

    if (code) {
      const result = await axios({
        method: 'PUT',
        url: url,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'kun-nonce': nonce,
          'kun-apikey': apiKey,
          'kun-signature': shex,
        },
        data: { code },
      });
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

export { checkKuna, redeemKuna };
