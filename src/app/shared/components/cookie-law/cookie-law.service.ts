/**
 * Adapted from angular2-cookie-law
 *
 * Copyright 2016-2017, @andreasonny83, All rights reserved.
 *
 * @author: @andreasonny83 <andreasonny83@gmail.com>
 * 
 * add policy version into the cookie name and compare it
 */
import { Injectable } from '@angular/core';

@Injectable()
export class CookieLawService {

  public seen(cookieName: string = 'cookieLawSeen', version: number): boolean {
    return this.cookieExisits(cookieName, version);
  }

  public storeCookie(cookieName: string, expiration?: number): void {
    return this.setCookie(cookieName, expiration);
  }

  /**
   * try to read a saved cookie
   *
   * @param  {string} name [the cookie name]
   *
   * @return {string}      [the cookie's value]
   */
  private cookieExisits(name: string, version: number): boolean {
    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const cookieName: string = name + '_version_';
    let c: string;
    let maxVersion = 0;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) !== -1) {
        const equal_loc = c.indexOf('=');
        const len = cookieName.length;
        const verStr = c.substr(len, equal_loc - len );
        const savedVersion: number = Number.parseInt(verStr);
        if (savedVersion > maxVersion) {
          maxVersion = savedVersion;
        }
      }
    }
    if (maxVersion < version) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * store a new cookie in the browser
   *
   * @param {string} name [the name for the cookie]
   */
  private setCookie(name: string, expiration?: number): void {
    const date = new Date();
    let expires;
    date.setTime(date.getTime() + expiration * 86400000);
    expires = '; expires=' + date.toUTCString();

    document.cookie = encodeURIComponent(name) + '=true; path=/' + expires;
  }
}
