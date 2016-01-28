<?php

/**
 * Ace WSK Direct Post PHP function.  
 *
 * @param string $authKey Determines a product type as well as the type of flow.
 *        Please update authkey with the one provided to you by an Account Manager.
 *        Testing and Production authkeys are different.
 * @param string|array $query Query data for posting.
 * @param string $server By default is "test". Will need to be changed to "public" once you go live.
 * @return string Session ID will be returned for WSK client script (see "follow_session" option).
 *
 * @example
 *
 * Posting query to development server and return session id string or empty string in case of any error occurs:
 *   $wskSessionId = wskDirectPost("52ab62e8-f9fc-4986-8a4e-dc10573c21bd", array("FirstName" => "Test Name", "Email" => "email@example.com"));
 *
 * Posting query to PRODUCTION server and return session id string or empty string in case of any error occurs:
 *   $wskSessionId = wskDirectPost("Production-Authkey", array("FirstName" => "Test Name", "Email" => "email@example.com"), "public");
 */

function wskDirectPost($authKey, $query, $server = "test") {
    if ($authKey && $query) {
        $url = "https://$server.axdapi.com/direct/customform/$authKey";
        $postdata = is_string($query) ? $query : http_build_query($query);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 1);
        curl_exec($ch);
        $result = curl_multi_getcontent($ch);
        curl_close($ch);
        if ($result && ($response = json_decode($result)) && $response->pubkey) {
            return $response->pubkey;
        }
    }
    return "";
}