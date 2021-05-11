package com.iqmsoft.jwt;
public class AuthenticationException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = -2656840295436090974L;

	public AuthenticationException(String message, Throwable cause) {
        super(message, cause);
    }
}

