# シーシャどこ？ (Shisha Doko?)

現在地から近くの評価が高い（★3.5以上）営業中のシーシャ屋を検索できるWebアプリです。

## 🚀 使い方 (Deployment)

このプロジェクトは単一の `index.html` ファイルとして動作します。

### 1. Google Maps APIキーの設定 (重要)
このアプリを動作させるには、Google Maps APIキーが必要です。
1. [Google Cloud Console](https://console.cloud.google.com/) でプロジェクトを作成し、APIキーを取得します。
2. **Maps JavaScript API** と **Places API** を有効にします。
3. `index.html` をエディタで開き、以下の部分をあなたのAPIキーに書き換えてください。
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places..."></script>
   ```
   (`YOUR_API_KEY` の部分を実際のキーに置き換える)

### 2. GitHub Pagesへのデプロイ
1. `index.html` と `public/shisha-bg.jpg` をGitHubリポジトリにアップロードします。
2. リポジトリの **Settings > Pages** に移動します。
3. **Branch** を `main` に設定し、Saveを押します。
4. 表示されるURLにアクセスして動作を確認します。

## 🛠 機能
- **現在地検索**: GPSを使用して近くのお店を探します。
- **厳選フィルター**: 
    - 半径1km以内の徒歩圏内
    - 評価3.5以上
    - 現在「営業中」のお店のみ
- **経路案内**: お店をクリックするとGoogleマップで経路を表示します。
- **完全日本語対応**

## ⚠️ 注意点
- APIキーがない場合、または位置情報が許可されていない場合は、デモ用データが表示されるか、警告が表示されます。

## Local Development
```bash
npm install
npm run dev
```

## Troubleshooting
If you see "Application Error":
- Check the Vercel logs.
- Ensure dependencies are installed (`npm install`).
