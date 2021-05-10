import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Button } from './Button';

import '../styles/sidebar.scss';
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  onChangeSelectedGenreId: (id: number) => void;
}

export function SideBar({ onChangeSelectedGenreId }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => { setSelectedGenreId(genre.id); onChangeSelectedGenreId(genre.id) }}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}