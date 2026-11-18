#!/usr/bin/env bash
set -euo pipefail

wordpress_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
output_dir="${1:-$wordpress_dir}"
mkdir -p "$output_dir"
output_dir="$(cd "$output_dir" && pwd)"

theme=akah-mobile-child
archive=akah-mobile-child-theme.zip
for asset in style.css assets/app/storefront.css assets/app/storefront.js; do
  test -s "$wordpress_dir/$theme/$asset" || {
    printf 'Missing %s. Run pnpm build:wordpress first.\n' "$asset" >&2
    exit 1
  }
done

staging="$(mktemp -d "$output_dir/.akah-package.XXXXXX")"
trap 'rm -rf "$staging"' EXIT
cp -R "$wordpress_dir/$theme" "$staging/"
find "$staging/$theme" -type d -exec chmod 755 '{}' +
find "$staging/$theme" -type f -exec chmod 644 '{}' +
(
  cd "$staging"
  zip -q -r "$archive" "$theme"
  unzip -tq "$archive"
)
mv "$staging/$archive" "$output_dir/$archive"
printf '%s\n' "$output_dir/$archive"
