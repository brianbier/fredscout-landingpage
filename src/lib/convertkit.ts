const CONVERTKIT_API_URL = 'https://api.convertkit.com/v4';
const CONVERTKIT_FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID;
const CONVERTKIT_API_KEY = process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY;

export interface SubscribeResponse {
  success: boolean;
  message?: string;
}

export async function subscribeToNewsletter(email: string): Promise<SubscribeResponse> {
  console.log('=== ConvertKit Debug Info ===');
  console.log('CONVERTKIT_FORM_ID:', CONVERTKIT_FORM_ID);
  console.log('CONVERTKIT_API_KEY exists:', !!CONVERTKIT_API_KEY);
  console.log('Email:', email);

  if (!CONVERTKIT_FORM_ID || !CONVERTKIT_API_KEY) {
    console.warn('ConvertKit configuration missing - using mock response');
    // Mock success for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Successfully subscribed (mock)' });
      }, 1000);
    });
  }

  console.log('Subscribing with ConvertKit V4...', { CONVERTKIT_FORM_ID, email });

  try {
    const response = await fetch(`${CONVERTKIT_API_URL}/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONVERTKIT_API_KEY}`,
      },
      body: JSON.stringify({
        email_address: email,
        tags: ['fretscout-landing', 'guitar-enthusiast']
      }),
    });

    console.log('ConvertKit V4 response status:', response.status);

    const data = await response.json();
    console.log('ConvertKit V4 response data:', data);

    if (response.ok) {
      return { success: true, message: 'Successfully subscribed!' };
    } else {
      throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(data)}`);
    }
  } catch (error) {
    console.error('ConvertKit V4 subscription error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again later.'
    };
  }
}