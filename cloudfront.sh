aws cloudfront create-distribution --distribution-config '{
  "CallerReference": "adenine-africa-1",
  "Aliases": {"Quantity": 1, "Items": ["www.adenine.africa"]},
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [{
      "Id": "s3-adenine-africa",
      "DomainName": "adenine-africa.s3-website-us-east-1.amazonaws.com",
      "CustomOriginConfig": {
        "HTTPPort": 80,
        "HTTPSPort": 443,
        "OriginProtocolPolicy": "http-only"
      }
    }]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "s3-adenine-africa",
    "ViewerProtocolPolicy": "redirect-to-https",
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
    "AllowedMethods": {"Quantity": 2, "Items": ["GET", "HEAD"], "CachedMethods": {"Quantity": 2, "Items": ["GET", "HEAD"]}},
    "Compress": true,
    "ForwardedValues": {"QueryString": false, "Cookies": {"Forward": "none"}}
  },
  "ViewerCertificate": {
    "ACMCertificateArn": "arn:aws:acm:us-east-1:992313156275:certificate/ba540801-34e7-41ab-b5e3-2cb44f7eacdc",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  },
  "Enabled": true,
  "Comment": "Adenine Research website",
  "CustomErrorResponses": {
    "Quantity": 1,
    "Items": [{
      "ErrorCode": 403,
      "ResponsePagePath": "/error.html",
      "ResponseCode": "404",
      "ErrorCachingMinTTL": 10
    }]
  }
}'

