# SPDX-License-Identifier: Apache-2.0
# Optional maintainer artwork generator; not executed by the site build.
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
from fontTools.pens.basePen import BasePen
from fontTools.svgLib.path import parse_path
import sys
r=Path(__file__).resolve().parent.parent
font_path = sys.argv[1] if len(sys.argv) > 1 else '/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'
S=2;im=Image.new('RGB',(1200*S,630*S),'#f3f4f6');d=ImageDraw.Draw(im)
def rect(b,fill,rad=0,outline=None):d.rounded_rectangle(tuple(int(x*S) for x in b),radius=rad*S,fill=fill,outline=outline,width=S)
def line(p,c,width=1):d.line([(x*S,y*S) for x,y in p],fill=c,width=width*S)
def text(x,y,t,size,color='#111111'):d.text((x*S,y*S),t,font=ImageFont.truetype(font_path,size*S),fill=color)
for x in range(0,1200,40):line([(x,0),(x,630)],'#e9eaec')
for y in range(0,630,40):line([(0,y),(1200,y)],'#e9eaec')
rect((48,48,1152,582),'white',28,'#e6e6ea')
class Pen(BasePen):
 def __init__(self):super().__init__(None);self.pts=[]
 def xy(self,p):return ((84+(0.870+p[0]*.9332)*2.1)*S,(80+(1.069+p[1]*.9332)*2.1)*S)
 def _moveTo(self,p):self.pts=[self.xy(p)]
 def _lineTo(self,p):self.pts.append(self.xy(p))
 def _curveToOne(self,a,b,c):
  p0=self._getCurrentPoint()
  for i in range(1,25):
   t=i/24;u=1-t;p=tuple(u**3*p0[j]+3*u*u*t*a[j]+3*u*t*t*b[j]+t**3*c[j] for j in range(2));self.pts.append(self.xy(p))
 def _closePath(self):d.polygon(self.pts,fill='#111111')
 def _endPath(self):pass
p=Pen();parse_path('M24.076,7.110 A13.550,13.550 0 1 0 24.076,24.890 L18.642,20.166 A6.350,6.350 0 1 1 18.642,11.834 Z',p)
for x,y,w,h in [(25.626,9.6,2.65,12.8),(29.476,12.475,2.65,8.15)]:rect((84+(.870+x*.9332)*2.1,80+(1.069+y*.9332)*2.1,84+(.870+(x+w)*.9332)*2.1,80+(1.069+(y+h)*.9332)*2.1),'#111111',1)
text(172,74,'Compare',44)
text(85,172,'软件对比',68)
text(88,274,'选工具，先比较。',30,'#3a3a3a')
text(88,332,'Compare features, pricing & platforms.',24,'#5c5c5c')
rect((88,407,496,461),'#e5f6ee',27);text(112,414,'免费浏览比较 · 无需注册',24,'#155b3b')
# Abstract comparison cards, not claims about named products.
rect((757,167,1122,446),'#e7eeff',22)
rect((785,196,1094,367),'#ffffff',14,'#bcc9e2')
text(804,207,'FEATURES',15,'#5c5c5c')
for y,label in [(250,'价格 / Price'),(286,'平台 / Platform'),(322,'功能 / Features')]:
 text(805,y,label,16,'#34405a');rect((976,y+4,1014,y+14),'#c9e1d8',5);rect((1030,y+4,1068,y+14),'#e8d5bc',5)
text(790,392,'Discover your next tool',21,'#34405a')
line([(88,500),(1112,500)],'#e6e6ea');text(88,513,'compare.pageon.cc',22,'#5c5c5c');text(808,517,'第三方软件价格另计',18,'#5c5c5c')
im.resize((1200,630),Image.Resampling.LANCZOS).save(r/'site/public/social/compare-preview.png',optimize=True)
