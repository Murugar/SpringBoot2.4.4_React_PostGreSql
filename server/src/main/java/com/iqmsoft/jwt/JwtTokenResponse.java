package com.iqmsoft.jwt;
import java.io.Serializable;

public class JwtTokenResponse implements Serializable {


 
/**
	 * 
	 */
	private static final long serialVersionUID = -1329873921042410240L;
private final String token;

    public JwtTokenResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }
}