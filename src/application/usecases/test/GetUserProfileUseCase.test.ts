import { describe, it, vi, expect } from "vitest"
import UserProfile from "../../../domain/users/entity/UserProfile"
import type UserRepository from "../../../domain/users/UserRepository"
import GetUserProfileUseCase from "../GetUserProfileUseCase"

describe("GetUserProfileUseCase", () => {
  it("should orchestrate the get user profile action correctly", async () => {
    const mockUserProfile = new UserProfile(
      'user-123',
      'user',
      'Fullname'
    )

    const mockUserRepository: UserRepository = {
      getUserProfile: vi.fn().mockResolvedValue(mockUserProfile),
      registerAccount: vi.fn()
    }

    const getUserProfileUseCase = new GetUserProfileUseCase(mockUserRepository)

    const result: UserProfile = await getUserProfileUseCase.execute()

    expect(mockUserRepository.getUserProfile).toHaveBeenCalled()
    expect(result).toStrictEqual(mockUserProfile)
  })
})
