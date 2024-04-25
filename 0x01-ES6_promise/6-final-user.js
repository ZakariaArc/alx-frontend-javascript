import { signUpUser } from './4-user-promise.js';
import { uploadPhoto } from './5-photo-reject.js';

export async function handleProfileSignup(firstName, lastName, fileName) {
  try {
    const userPromise = signUpUser(firstName, lastName);
    const photoPromise = uploadPhoto(fileName);

    const [userResult, photoResult] = await Promise.allSettled([userPromise, photoPromise]);

    return [
      { status: userResult.status, value: userResult.status === 'fulfilled' ? userResult.value : userResult.reason },
      { status: photoResult.status, value: photoResult.status === 'fulfilled' ? photoResult.value : photoResult.reason }
    ];
  } catch (error) {
    return [{ status: 'rejected', value: error }];
  }
}

export default handleProfileSignup;