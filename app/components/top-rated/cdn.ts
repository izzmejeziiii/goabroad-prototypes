/* URL helpers for GoAbroad's Cloudinary CDN and goabroad.com links. The
   directory clone under /program-comparison uses the same base and folders. */

import type { TopRatedProgram } from "./types";

const CDN = "https://images.goabroad.com/image/upload";

export const GOABROAD = "https://www.goabroad.com";

function cdn(path: string, transform: string) {
    return `${CDN}/${transform}/v1/images2/${path}`;
}

/** A photo cropped to `w`×`h`, face-aware, in the browser's best format. */
export function photoUrl(path: string, w: number, h: number) {
    return cdn(path, `c_fill,g_faces:auto,f_auto,q_auto,w_${w},h_${h}`);
}

/** Provider logo padded into a square, the way the directory renders them. */
export function logoUrl(file: string, size = 80) {
    return cdn(`clients/logos/MAIN/${file}`, `c_pad,f_auto,w_${size},h_${size}`);
}

/** Top Rated badge artwork, served at the height provider pages use. */
export function badgeUrl(file: string) {
    return cdn(`partners/${file}`, "f_auto,h_200");
}

export function providerUrl(alias: string) {
    return `${GOABROAD}/providers/${alias}`;
}

/** The reviews section of a provider page — goabroad.com redirects its old
    `/reviews` path to this anchor. */
export function providerReviewsUrl(alias: string) {
    return `${GOABROAD}/providers/${alias}#reviews`;
}

export function programUrl(program: TopRatedProgram) {
    return `${GOABROAD}/providers/${program.providerAlias}/programs/${program.slug}-${program.id}`;
}
