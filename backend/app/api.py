from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

DATABASE_URL = "postgresql://postgres:admin@localhost:5433/movies"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


class Movie(Base):
    __tablename__ = "movies"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    release_year = Column(Integer)
    genre = Column(String)
    personal_notes = Column(Text)

Base.metadata.create_all(bind=engine)


class MovieIn(BaseModel):
    title: str
    release_year: Optional[int]
    genre: Optional[str]
    personal_notes: Optional[str]

class MovieOut(MovieIn):
    id: int
    class Config:
        orm_mode = True


app = FastAPI()


origins = [
    "http://localhost:5173",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/", tags=["root"], response_model=List[MovieOut])
def get_movies(db: Session = Depends(get_db)):
    return db.query(Movie).all()


@app.post("/movies", tags=["movies"], response_model=MovieOut)
def add_movie(movie: MovieIn, db: Session = Depends(get_db)):
    db_movie = Movie(**movie.dict())
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    return db_movie


@app.put("/movies/{movie_id}", tags=["movies"], response_model=MovieOut)
def update_movie(movie_id: int, movie: MovieIn, db: Session = Depends(get_db)):
    db_movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if not db_movie:
        raise HTTPException(status_code=404, detail="Movie doesn't exist in the database")
    for key, value in movie.dict().items():
        setattr(db_movie, key, value)
    db.commit()
    db.refresh(db_movie)
    return db_movie


@app.delete("/movies/{movie_id}", tags=["movies"])
def delete_movie(movie_id: int, db: Session = Depends(get_db)):
    db_movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if not db_movie:
        raise HTTPException(status_code=404, detail="Movie doesn't exist in the database")
    db.delete(db_movie)
    db.commit()
    return {"detail": "Movie deleted"}
