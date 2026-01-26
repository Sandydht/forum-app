import { describe, it, expect } from 'vitest'
import NewAuth from '../NewAuth'

describe('NewAuth entity', () => {
  const validPayload = {
    accessToken: 'access-token-123',
    refreshToken: 'refresh-token-123',
  }

  it('should throw error when access token is empty', () => {
    expect(() =>
      new NewAuth(
        '',
        validPayload.refreshToken
      )
    ).toThrowError('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when refresh token is empty', () => {
    expect(() =>
      new NewAuth(
        validPayload.accessToken,
        ''
      )
    ).toThrowError('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when access token is blank', () => {
    expect(() =>
      new NewAuth(
        '   ',
        validPayload.refreshToken
      )
    ).toThrowError('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when refresh token is blank', () => {
    expect(() =>
      new NewAuth(
        validPayload.accessToken,
        '   '
      )
    ).toThrowError('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should create NewAuth correctly when payload is valid', () => {
    const newAuth = new NewAuth(
      validPayload.accessToken,
      validPayload.refreshToken
    )

    expect(newAuth.getAccessToken()).toBe(validPayload.accessToken)
    expect(newAuth.getRefreshToken()).toBe(validPayload.refreshToken)
  })
})
