"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractKidFromIdToken = exports.extractJwtHeader = exports.verifyJwsUsingKeyStore = exports.verifyJWS = exports.decryptJWE = void 0;
const jose = require("node-jose");
const SingpassMyinfoError_1 = require("./error/SingpassMyinfoError");
async function decryptJWE(jwe, decryptKey, format = "pem") {
    if (!jwe)
        throw new SingpassMyinfoError_1.SingpassMyInfoError("Missing JWE data.");
    if (!decryptKey)
        throw new SingpassMyinfoError_1.SingpassMyInfoError("Missing key to decrypt JWE payload.");
    // TODO: can be further optimized by caching key in memory instead of regenerating each time
    let keyOrKeyStore;
    // if format is `json` we should expect both JWK / JWKS
    if (format === "json") {
        const parsed = JSON.parse(decryptKey);
        const keyset = parsed.keys ? parsed : { keys: [parsed] };
        keyOrKeyStore = await jose.JWK.asKeyStore(keyset);
    }
    else {
        keyOrKeyStore = await jose.JWK.asKey(decryptKey, format);
    }
    // allow all supported algorithms
    return jose.JWE.createDecrypt(keyOrKeyStore, { algorithms: ["*"] }).decrypt(jwe);
}
exports.decryptJWE = decryptJWE;
async function verifyJWS(jws, verifyCert, format = "pem") {
    if (!jws)
        throw new SingpassMyinfoError_1.SingpassMyInfoError("Missing JWS data.");
    if (!verifyCert)
        throw new SingpassMyinfoError_1.SingpassMyInfoError("Missing cert to verify JWS payload.");
    // TODO: can be further optimized by caching key in memory instead of regenerating each time
    const jwsKey = await jose.JWK.asKey(verifyCert, format);
    return jose.JWS.createVerify(jwsKey).verify(jws);
}
exports.verifyJWS = verifyJWS;
async function verifyJwsUsingKeyStore(jws, keys) {
    if (!jws)
        throw new SingpassMyinfoError_1.SingpassMyInfoError("Missing JWT data.");
    if (!keys)
        throw new SingpassMyinfoError_1.SingpassMyInfoError("Missing key set.");
    const keyStore = await jose.JWK.asKeyStore(keys);
    return jose.JWS.createVerify(keyStore).verify(jws);
}
exports.verifyJwsUsingKeyStore = verifyJwsUsingKeyStore;
function extractJwtHeader(jwt) {
    const jwtComponents = jwt.split(".");
    const header = jose.util.base64url.decode(jwtComponents[0]);
    return JSON.parse(header.toString());
}
exports.extractJwtHeader = extractJwtHeader;
function extractKidFromIdToken(tokens) {
    const { id_token: idToken } = tokens;
    const { kid } = extractJwtHeader(idToken);
    if (!kid)
        throw new SingpassMyinfoError_1.SingpassMyInfoError("Missing kid.");
    return kid;
}
exports.extractKidFromIdToken = extractKidFromIdToken;
//# sourceMappingURL=JweUtil.js.map