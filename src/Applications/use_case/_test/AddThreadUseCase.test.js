const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');
const AddThread = require('../../../Domains/threads/entities/AddedThread'); 

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange

    /** creating dependency of use case */
    const mockThreatRepository = new ThreadRepository();
    const mockReturnAddedThreat = new AddThread({
      id: 'threat-123',
      title: 'dummy title',
      owner: 'user-123'
    });
 
    /** mocking needed function */
    mockThreatRepository.addThread = jest.fn(() => Promise.resolve(mockReturnAddedThreat));
 
    /** creating use case instance */
    const threatUseCase = new AddThreadUseCase({
      threadRepository: mockThreatRepository,
    });
    const useCasePayload = {
      title: 'dummy title',
      body: 'dummy body',
      owner: 'user-123'
    }
    const expectedAddedThreat = {
      id: 'threat-123',
      title: 'dummy title',
      owner: 'user-123'
    }
 
    // Action
    const addedThreat = await threatUseCase.execute(useCasePayload);
 
    // Assert
    expect(addedThreat).toEqual(expectedAddedThreat);
    expect(mockThreatRepository.addThread).toBeCalledWith(useCasePayload);

  });
});
