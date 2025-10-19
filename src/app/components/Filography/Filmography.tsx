"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Filmography.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Film {
  title: {
    id: string;
    primaryTitle: string;
    primaryImage?: { url: string };
    startYear?: number;
    genres?: string[];
    rating?: { aggregateRating?: number };
  };
  characters?: string[];
  category?: string;
  episodeCount?: number;
}

interface FilmographyResponse {
  credits: Film[];
  totalCount: number;
}

const Filmography: React.FC = () => {
  const [filmography, setFilmography] = useState<Film[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const filmRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [filmRes, profileRes] = await Promise.all([
          fetch(
            "https://api.imdbapi.dev/names/nm12616332/filmography?pageSize=10"
          ),
          fetch("https://api.imdbapi.dev/names/nm12616332"),
        ]);

        const filmData: FilmographyResponse = await filmRes.json();
        const profileData = await profileRes.json();

        setFilmography(filmData.credits);
        setProfile(profileData);
      } catch (err) {
        console.error("Error fetching IMDb data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (filmography.length > 0) {
      filmRefs.current.forEach((el) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }
      });
    }
  }, [filmography]);

  return (
    <div className={styles.container}>
      {/* Profile */}
      {profile && (
        <div className={styles.profile}>
          {profile.primaryImage?.url && (
            <img
              src={profile.primaryImage.url}
              alt={profile.name}
              className={styles.profileImage}
            />
          )}
          <h1 className={styles.profileName}>{profile.name}</h1>
          <p className={styles.profileProfession}>{profile.profession}</p>
          {profile.knownForTitles && (
            <p className={styles.profileKnown}>
              Known for:{" "}
              {profile.knownForTitles
                .map((t: any) => t.primaryTitle)
                .join(", ")}
            </p>
          )}
        </div>
      )}

      {/* Filmography grid */}
      <div className={styles.grid}>
        {filmography.map((film, i) => (
          <div
            key={i}
            ref={(el) => {
              filmRefs.current[i] = el;
            }}
            className={styles.card}
          >
            {film.title.primaryImage?.url ? (
              <img
                src={film.title.primaryImage.url}
                alt={film.title.primaryTitle}
                className={styles.poster}
              />
            ) : (
              <div className={styles.noImage}>No image</div>
            )}
            <div className={styles.cardContent}>
              <h2 className={styles.title}>{film.title.primaryTitle}</h2>
              <p className={styles.meta}>
                {film.title.startYear} • {film.title.genres?.join(", ")}
              </p>
              <p className={styles.character}>
                Role: {film.characters?.join(", ") || "Unknown"}
              </p>
              {film.title.rating?.aggregateRating && (
                <p className={styles.rating}>
                  ⭐ {film.title.rating.aggregateRating.toFixed(1)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filmography;
