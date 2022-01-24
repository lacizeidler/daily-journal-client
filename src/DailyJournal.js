import React, { useState, useEffect } from "react";
import { EntryForm } from "./components/EntryForm";
import { EntryList } from "./components/EntryList";
import { addEntry, deleteEntry, getEntries, getEntryById, updateEntry } from "./components/EntryManager";
import { getMoods } from "./components/mood/MoodManager";
import { getEntryTags, getTags } from "./components/tag/TagManager";

export const DailyJournal = () => {
  const [entries, setEntries] = useState([])
  const [moods, setMoods] = useState([])
  const [entry, setEntry] = useState({})
  const [entryTag, setEntryTag] = useState({})
  const [tags, setTags] = useState([])
  const [entryTags, setEntryTags] = useState([])

  useEffect(() => {
    getAllEntries()
    getMoods().then(moodsData => setMoods(moodsData))
    getTags().then(tagsData => setTags(tagsData))
    getEntryTags().then(entryTagsData => setEntryTags(entryTagsData))
  }, [])

  const getAllEntries = () => {
    getEntries().then(entriesData => setEntries(entriesData))
  }

  const onEditButtonClick = (entryId) => {
    getEntryById(entryId).then(entryData => setEntry(entryData)).then(() => console.log(entry))
  }

  const onDeleteButtonClick = (entryId) => {
    deleteEntry(entryId)
      .then(getAllEntries)
  }

  const onFormSubmit = (entryData) => {
    console.log("submit", entryData)
    if (entryData.id) {
      updateEntry(entryData).then(getAllEntries)
    } else {
      addEntry(entryData).then(getAllEntries)
    }
    setEntry({
      concept: "",
      entry: "",
      moodId: 0
    })
    setEntryTag({
      entry_id: entry.id,
      tag_id: 0
    })
  }

  return (
    <div className="DailyJournal container">
      <div className="columns">
        <div className="column">
          <EntryForm entry={entry} entryTag={entryTag} moods={moods} tags={tags} onFormSubmit={onFormSubmit} />
        </div>
        <div className="column">
          <EntryList
            entries={entries}
            moods={moods}
            entryTags={entryTags}
            onEditButtonClick={onEditButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
          />
        </div>
      </div>

    </div>
  );
};
