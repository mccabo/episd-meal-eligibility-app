# Troubleshooting: Precondition Failed Error

## Error Message
```
Functions deploy had errors with the following functions:
    aiPrompt(us-central1)
    downloadImage(us-central1)
Error: There was an error deploying functions:
- Error Precondition failed
- Error Precondition failed
```

## Most Common Cause: Billing Plan Required

**Firebase Functions require the Blaze (pay-as-you-go) plan.**

### Why?
- Cloud Functions is a Google Cloud Platform service
- It requires a billing account (but has a generous free tier!)
- **Free tier includes 2 million function invocations per month**
- Most small to medium apps stay completely within the free tier

### Solution: Upgrade to Blaze Plan

#### Step 1: Go to Firebase Console
Visit: https://console.firebase.google.com/project/freeandreduced-ac6d8/overview

#### Step 2: Upgrade Plan
1. Click on **"Upgrade"** in the bottom left corner (or in the banner)
2. Select **"Blaze Plan"** (Pay as you go)
3. Link or create a Google Cloud billing account
4. Complete the upgrade

#### Step 3: Verify Upgrade
After upgrading, verify your plan:
```bash
firebase projects:list
```

You should see your project listed with billing enabled.

#### Step 4: Redeploy
```bash
firebase deploy --only functions
```

## Free Tier Limits (Blaze Plan)

Even on Blaze plan, you get these FREE every month:
- **2 million function invocations**
- **400,000 GB-seconds of compute time**
- **200,000 GHz-seconds of compute time**
- **5 GB network egress**

### Example Usage Costs (After Free Tier)
- Function invocations: $0.40 per million
- Compute time: $0.0000025 per GB-second
- Most apps never exceed the free tier!

## Alternative Causes

### 1. Required APIs Not Enabled

Enable these APIs in Google Cloud Console:
- Cloud Functions API
- Cloud Build API
- Cloud Run Admin API

Visit: https://console.cloud.google.com/apis/library?project=freeandreduced-ac6d8

Search for and enable:
- "Cloud Functions API"
- "Cloud Build API"
- "Cloud Run Admin API"
- "Artifact Registry API"

### 2. IAM Permissions Issue

Ensure your account has these roles:
- Cloud Functions Admin
- Service Account User
- Cloud Build Editor

Check at: https://console.cloud.google.com/iam-admin/iam?project=freeandreduced-ac6d8

### 3. Existing Functions Conflict

If functions already exist, try deleting them first:
```bash
# Delete existing functions
firebase functions:delete aiPrompt
firebase functions:delete downloadImage

# Redeploy
firebase deploy --only functions
```

### 4. Region Issues

Ensure the region (us-central1) is available. You can change the region in `functions/index.js`:

```javascript
// At the top of the file, set region
const functions = require('firebase-functions').region('us-central1');
```

Or try a different region:
```javascript
const functions = require('firebase-functions').region('us-east1');
```

## Verification Steps

### Check Project Status
```bash
firebase projects:list
```

### Check Current Functions
```bash
firebase functions:list
```

### View Detailed Logs
```bash
firebase deploy --only functions --debug
```

This will show detailed error messages.

## Quick Fix Checklist

- [ ] Upgrade Firebase project to Blaze plan
- [ ] Enable Cloud Functions API
- [ ] Enable Cloud Build API
- [ ] Verify billing account is linked
- [ ] Check IAM permissions
- [ ] Try deploying again

## Still Having Issues?

### 1. Check Firebase Status
Visit: https://status.firebase.google.com/

### 2. View Detailed Error
Run deployment with debug flag:
```bash
firebase deploy --only functions --debug > deployment-log.txt 2>&1
```

Then share the log for more specific troubleshooting.

### 3. Check Google Cloud Console
Visit your project: https://console.cloud.google.com/functions/list?project=freeandreduced-ac6d8

Check for any error messages or warnings.

### 4. Verify Service Account
Check that the default service account exists and has permissions:
```
freeandreduced-ac6d8@appspot.gserviceaccount.com
```

## Contact Support

If none of the above works:
1. Go to Firebase Console > Support
2. Or visit: https://firebase.google.com/support
3. Describe the "Precondition failed" error with your project ID

---

## Most Likely Solution

**The most common fix is simply upgrading to the Blaze plan:**

1. Visit: https://console.firebase.google.com/project/freeandreduced-ac6d8
2. Click "Upgrade" 
3. Select "Blaze Plan"
4. Link billing account
5. Redeploy: `firebase deploy --only functions`

**Don't worry about costs** - the free tier is very generous and most apps never exceed it! 🎉

