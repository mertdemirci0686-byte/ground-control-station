const Store = require('electron-store');
const store = new Store();

// License key validation
const VALID_KEYS = [
  'GCS-PRO-2024-ABCD1234',
  'GCS-PRO-2024-EFGH5678',
  'GCS-PRO-2024-IJKL9012',
];

const LICENSE_KEY = 'app_license_key';
const LICENSE_STATUS = 'app_license_status';

async function validate(key) {
  if (!key) {
    return {
      valid: false,
      message: 'License key is required',
    };
  }

  // In development mode, allow admin mode
  if (process.env.NODE_ENV === 'development') {
    return {
      valid: true,
      type: 'admin',
      message: 'Development mode - admin access granted',
    };
  }

  // Check if key is in valid keys list
  const isValid = VALID_KEYS.includes(key.trim().toUpperCase());

  if (isValid) {
    return {
      valid: true,
      type: 'pro',
      message: 'Valid Pro license',
    };
  }

  return {
    valid: false,
    message: 'Invalid license key',
  };
}

async function activate(key) {
  const validation = await validate(key);
  
  if (validation.valid) {
    store.set(LICENSE_KEY, key);
    store.set(LICENSE_STATUS, {
      activated: true,
      type: validation.type,
      activatedAt: new Date().toISOString(),
    });
  }

  return validation;
}

async function getStatus() {
  // In development mode, return admin status
  if (process.env.NODE_ENV === 'development') {
    return {
      activated: true,
      type: 'admin',
      message: 'Development mode',
    };
  }

  const key = store.get(LICENSE_KEY);
  const status = store.get(LICENSE_STATUS);

  if (!key || !status) {
    return {
      activated: false,
      type: 'free',
      message: 'No license activated',
    };
  }

  // Validate stored key
  const validation = await validate(key);
  
  if (!validation.valid) {
    // Clear invalid license
    store.delete(LICENSE_KEY);
    store.delete(LICENSE_STATUS);
    return {
      activated: false,
      type: 'free',
      message: 'License invalid or expired',
    };
  }

  return {
    activated: true,
    type: status.type,
    activatedAt: status.activatedAt,
    message: 'License active',
  };
}

async function deactivate() {
  store.delete(LICENSE_KEY);
  store.delete(LICENSE_STATUS);
  return {
    success: true,
    message: 'License deactivated',
  };
}

module.exports = {
  validate,
  activate,
  getStatus,
  deactivate,
};
