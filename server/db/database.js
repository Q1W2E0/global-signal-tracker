const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'tracker.db');
const db = new sqlite3.Database(dbPath);

const database = {
  db,
  init: function() {
    this.db.serialize(() => {
      // 坐标卡表
      this.db.run(`
        CREATE TABLE IF NOT EXISTS signals (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date TEXT NOT NULL,
          event TEXT NOT NULL,
          flow TEXT,
          system TEXT,
          layer TEXT,
          hooks TEXT,
          stakeholders TEXT,
          change_rate TEXT,
          associations TEXT,
          prediction TEXT,
          confidence TEXT,
          review_date TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // 20指标面板表
      this.db.run(`
        CREATE TABLE IF NOT EXISTS indicators (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          category TEXT,
          current_value REAL,
          previous_value REAL,
          change_rate REAL,
          unit TEXT,
          data_source TEXT,
          last_update DATETIME,
          trend TEXT,
          notes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // 趋势跟踪表
      this.db.run(`
        CREATE TABLE IF NOT EXISTS trends (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          description TEXT,
          confidence_score INTEGER,
          evidence TEXT,
          falsification_condition TEXT,
          status TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          last_review DATETIME
        )
      `);

      // 日报表
      this.db.run(`
        CREATE TABLE IF NOT EXISTS daily_reports (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date TEXT UNIQUE NOT NULL,
          signal_count INTEGER,
          signals_json TEXT,
          summary TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // 周报表
      this.db.run(`
        CREATE TABLE IF NOT EXISTS weekly_reports (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          week_start TEXT NOT NULL,
          week_end TEXT NOT NULL,
          capital_flow TEXT,
          commodity_flow TEXT,
          geopolitics TEXT,
          technology TEXT,
          trend_analysis TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // 月报表
      this.db.run(`
        CREATE TABLE IF NOT EXISTS monthly_reports (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          month TEXT UNIQUE NOT NULL,
          prediction_review TEXT,
          trend_scoring TEXT,
          framework_updates TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // 信息源表
      this.db.run(`
        CREATE TABLE IF NOT EXISTS sources (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          url TEXT,
          category TEXT,
          priority INTEGER,
          last_checked DATETIME,
          quality_score INTEGER,
          active INTEGER DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      console.log('✅ Database schema initialized');
    });
  },

  run: function(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  },

  get: function(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  all: function(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }
};

module.exports = database;
