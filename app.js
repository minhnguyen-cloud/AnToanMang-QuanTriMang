/* ATMMT local exam generator - no dependencies */
(function(){
  const $ = (id) => document.getElementById(id);
  const letters = ['A','B','C','D','E','F'];
  let currentExam = [];
  let currentExamSets = [];
  let userAnswers = {};
  let answersVisible = false;
  let lastExamIds = [];
  let examSubmitted = false;
  let timerId = null;
  let timerEndsAt = 0;
  let activeQuestionUid = null;
  const EXAM_CATALOG_SIZE = 20;
  const COMPLETED_EXAMS_KEY = 'atmmt-qtm-completed-exams-v1';

  const subjectConfig = {
    atmm: {
      label: 'ATMMT',
      fullName: 'An toàn mạng máy tính',
      examTitle: 'BỘ ĐỀ ÔN TẬP TẠO TỰ ĐỘNG'
    },
    qtm: {
      label: 'QTM',
      fullName: 'Quản trị mạng',
      examTitle: 'ĐỀ QUẢN TRỊ MẠNG - ÔN THI TỔNG HỢP'
    }
  };

  const typeLabel = {
    mcq:'Trắc nghiệm', tf:'Đúng/Sai', fill:'Điền khuyết', short:'Tự luận ngắn', match:'Ghép cặp', calc:'Bài tính'
  };
  const diffLabel = {1:'Cơ bản', 2:'Bằng đề ôn', 3:'Khó/gài bẫy'};
  const SUPPLEMENTAL_QUESTIONS = [
    {
      id:'SUP-MITM-DH-01', type:'mcq', lesson:'Bài 4', topic:'DH và MITM', difficulty:3,
      question:'Hai máy dùng Diffie-Hellman thuần túy qua kênh công khai. Attacker có thể thay giá trị công khai A và B trên đường truyền. Nhận định nào đúng nhất?',
      options:['DH vẫn an toàn vì shared secret không được gửi trực tiếp','Cần xác thực giá trị DH bằng chữ ký số/certificate để chống MITM','Chỉ cần tăng p lên số nguyên tố lớn hơn là đủ chống MITM','Đổi sang Caesar sẽ tránh bị thay khóa','Bỏ bước sinh khóa phiên là an toàn hơn'],
      answer:1,
      explanation:'DH giải quyết trao đổi khóa nhưng không tự xác thực danh tính. Nếu không ký hoặc xác thực endpoint, attacker có thể lập hai khóa riêng với hai phía rồi đứng giữa.'
    },
    {
      id:'SUP-RSA-PHI-01', type:'mcq', lesson:'Bài 4', topic:'RSA vận dụng', difficulty:3,
      question:'Trong RSA, chọn p và q quá gần nhau làm tăng rủi ro nào?',
      options:['Dễ dò p, q hơn bằng phân tích thừa số','Không tính được n','Public key biến thành private key','Không thể mã hóa thông điệp ngắn','Ciphertext luôn bằng plaintext'],
      answer:0,
      explanation:'An toàn RSA dựa vào độ khó phân tích n=pq. Nếu p và q có cấu trúc yếu hoặc quá gần nhau, một số phương pháp phân tích thừa số hiệu quả hơn.'
    },
    {
      id:'SUP-HASH-MAC-01', type:'mcq', lesson:'Bài 5', topic:'Hash/MAC', difficulty:3,
      question:'Một hệ thống chỉ gửi kèm SHA-256(message), không dùng khóa bí mật. Điều nào là điểm yếu chính?',
      options:['Không chứng minh được người gửi biết khóa bí mật','SHA-256 luôn giải mã ngược được','Digest luôn dài hơn message','Không kiểm tra được toàn vẹn','Không dùng được cho file lớn'],
      answer:0,
      explanation:'Hash không khóa kiểm tra thay đổi vô tình nếu digest được bảo vệ riêng, nhưng không xác thực nguồn gửi. MAC/HMAC cần khóa bí mật nên chống giả mạo tốt hơn.'
    },
    {
      id:'SUP-SIGN-MAC-01', type:'mcq', lesson:'Bài 5', topic:'Chữ ký số', difficulty:3,
      question:'Trong tranh chấp, vì sao chữ ký số phù hợp hơn MAC để chứng minh A đã gửi thông điệp?',
      options:['Chữ ký số dùng khóa riêng chỉ A giữ','MAC không cần khóa','MAC luôn dài hơn chữ ký','Chữ ký số không cần hash','MAC không kiểm tra toàn vẹn'],
      answer:0,
      explanation:'MAC dùng khóa chung nên cả hai bên đều tạo được MAC, khó quy trách nhiệm một phía. Chữ ký số dùng private key của người ký và public key để xác minh.'
    },
    {
      id:'SUP-TLS-01', type:'mcq', lesson:'Bài 6', topic:'TLS', difficulty:3,
      question:'Người dùng truy cập HTTPS nhưng bỏ qua cảnh báo certificate không hợp lệ. Rủi ro sát nhất là gì?',
      options:['Tăng tốc bắt tay TLS','Server có thể bị mạo danh trong MITM','Mã hóa AES tự tắt hoàn toàn','Trình duyệt không gửi HTTP request','DNS không phân giải được'],
      answer:1,
      explanation:'TLS cần xác thực certificate để biết public key thuộc đúng server. Bỏ qua cảnh báo làm attacker có thể đưa certificate giả và giải mã/đọc sửa lưu lượng.'
    },
    {
      id:'SUP-IPSEC-01', type:'mcq', lesson:'Bài 6', topic:'IPsec', difficulty:3,
      question:'Công ty muốn nối bảo mật hai chi nhánh qua Internet sao cho toàn bộ gói IP nội bộ được bọc trong gói IP mới. Chế độ IPsec phù hợp là:',
      options:['Tunnel mode','Transport mode','Open authentication','WEP shared key','Stateless filtering'],
      answer:0,
      explanation:'Tunnel mode bọc cả gói IP gốc trong gói mới, thường dùng gateway-to-gateway/VPN site-to-site. Transport mode chủ yếu bảo vệ payload giữa hai host.'
    },
    {
      id:'SUP-WIFI-01', type:'mcq', lesson:'Bài 7', topic:'Wi-Fi', difficulty:3,
      question:'Attacker dựng AP cùng tên mạng công ty và phát sóng mạnh hơn để người dùng kết nối nhầm. Đây là tình huống nào?',
      options:['Evil Twin','Smurf attack','Buffer overflow','RSA factoring','Screened subnet'],
      answer:0,
      explanation:'Evil Twin là điểm truy cập giả mạo SSID/hình ảnh mạng hợp pháp để lừa client kết nối, từ đó đánh cắp thông tin hoặc thực hiện MITM.'
    },
    {
      id:'SUP-WIFI-02', type:'mcq', lesson:'Bài 7', topic:'WPA handshake', difficulty:3,
      question:'Vì sao attacker hay gửi deauthentication frame trong tấn công Wi-Fi?',
      options:['Ép client kết nối lại để bắt handshake','Tăng độ dài khóa AES','Xóa certificate của CA','Tạo private key RSA mới','Bật DMZ trên router'],
      answer:0,
      explanation:'Deauth làm client rớt và bắt tay lại. Attacker thu handshake rồi thử đoán passphrase offline; bản thân deauth không trực tiếp giải mã được khóa.'
    },
    {
      id:'SUP-FW-ACL-01', type:'mcq', lesson:'Bài 8', topic:'ACL', difficulty:3,
      question:'Một rule firewall cho phép Internet truy cập thẳng database nhân sự ở internal network. Vấn đề chính là gì?',
      options:['Vi phạm least privilege và làm lộ tài nguyên nội bộ','Làm DNS chạy nhanh hơn','Chỉ ảnh hưởng giao thức UDP','Tự động bật chữ ký số','Biến firewall thành proxy hợp lệ'],
      answer:0,
      explanation:'Dịch vụ nội bộ nhạy cảm không nên public trực tiếp. Nên đặt dịch vụ cần public ở DMZ và chỉ mở đúng luồng cần thiết theo default deny.'
    },
    {
      id:'SUP-FW-STATE-01', type:'mcq', lesson:'Bài 8', topic:'Stateful firewall', difficulty:3,
      question:'Stateful firewall khác packet filter stateless ở điểm thực dụng nào?',
      options:['Theo dõi trạng thái phiên để quyết định gói phản hồi hợp lệ','Không cần rule','Luôn đọc được nội dung HTTPS','Thay thế hoàn toàn antivirus','Chỉ lọc theo địa chỉ MAC'],
      answer:0,
      explanation:'Stateful firewall nhớ connection state nên phân biệt gói phản hồi thuộc phiên hợp lệ với gói lạ. Stateless chủ yếu xét từng gói theo header/rule riêng lẻ.'
    },
    {
      id:'SUP-REPLAY-01', type:'mcq', lesson:'Bài 1', topic:'Replay attack', difficulty:3,
      question:'Một hệ thống chấp nhận lại mã OTP đã dùng cách đây 2 phút. Biện pháp đúng trọng tâm nhất là gì?',
      options:['Nonce/timestamp và đánh dấu token đã dùng','Tăng kích thước font form đăng nhập','Đổi HTTP sang FTP','Tắt log đăng nhập','Dùng cùng OTP cho nhiều phiên'],
      answer:0,
      explanation:'Replay khai thác thông điệp hợp lệ cũ. Nonce, timestamp, cửa sổ thời gian ngắn và danh sách token đã dùng giúp hệ thống từ chối bản phát lại.'
    },
    {
      id:'SUP-MALWARE-01', type:'mcq', lesson:'Bài 2a', topic:'Malware', difficulty:3,
      question:'Mã độc tự thay đổi cấu trúc chương trình qua mỗi lần lây, không chỉ đổi lớp mã hóa bên ngoài. Thuật ngữ sát nhất là:',
      options:['Metamorphic','Polymorphic đơn giản','Worm thuần túy','Port scanner','DMZ'],
      answer:0,
      explanation:'Polymorphic thường đổi hình thức/lớp mã hóa để né signature; metamorphic tái cấu trúc mã sâu hơn nên khó nhận diện bằng mẫu tĩnh.'
    },
    {
      id:'SUP-AES-01', type:'mcq', lesson:'Bài 3', topic:'Block cipher mode', difficulty:3,
      question:'Cùng plaintext block xuất hiện nhiều lần và ciphertext cũng lặp mẫu rõ ràng. Mode mã khối nào thường gây hiện tượng này?',
      options:['ECB','CBC với IV ngẫu nhiên','CTR với nonce duy nhất','GCM với nonce đúng','Không mode nào'],
      answer:0,
      explanation:'ECB mã hóa mỗi block độc lập, cùng plaintext block cho cùng ciphertext block. CBC/CTR/GCM cần IV/nonce đúng để tránh lộ mẫu lặp.'
    },
    {
      id:'SUP-OTP-01', type:'mcq', lesson:'Bài 3', topic:'One-time pad', difficulty:3,
      question:'One-time pad mất tính an toàn hoàn hảo khi lỗi nào xảy ra?',
      options:['Dùng lại khóa cho hai thông điệp','Khóa dài bằng thông điệp','Khóa sinh thật ngẫu nhiên','XOR từng bit','Người nhận biết khóa'],
      answer:0,
      explanation:'OTP chỉ an toàn khi khóa ngẫu nhiên, dài bằng thông điệp và dùng đúng một lần. Dùng lại khóa làm lộ quan hệ giữa các plaintext.'
    },
    {
      id:'SUP-PGP-01', type:'mcq', lesson:'Bài 6', topic:'PGP hybrid', difficulty:3,
      question:'Trong PGP kiểu hybrid, vì sao không mã hóa toàn bộ email bằng RSA trực tiếp?',
      options:['RSA chậm và không phù hợp dữ liệu lớn, nên dùng khóa phiên đối xứng cho nội dung','RSA không có public key','AES không giải mã được','Email không thể băm','Certificate chỉ dùng cho firewall'],
      answer:0,
      explanation:'Mô hình hybrid dùng AES/khóa phiên để mã hóa dữ liệu nhanh, rồi dùng public key RSA của người nhận để mã hóa khóa phiên.'
    },
    {
      id:'SUP-KERB-01', type:'mcq', lesson:'Bài 6', topic:'Kerberos', difficulty:3,
      question:'Trong Kerberos, client không gửi mật khẩu trực tiếp cho từng service chủ yếu để đạt mục tiêu nào?',
      options:['Giảm lộ mật khẩu và dùng ticket/khóa phiên để xác thực','Bỏ hoàn toàn KDC','Mã hóa ổ cứng','Tạo địa chỉ MAC mới','Thay thế DNS'],
      answer:0,
      explanation:'Kerberos dựa trên KDC, ticket và khóa phiên. Mật khẩu chỉ dùng trong quá trình lấy thông tin ban đầu, không phải gửi lại cho từng server dịch vụ.'
    }
  ];

  function xmur3(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return function() {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return (h ^= h >>> 16) >>> 0;
    };
  }
  function mulberry32(a) {
    return function() {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function rngFromSeed(seed){ return mulberry32(xmur3(seed)()); }
  function shuffle(arr, rng){
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(rng()*(i+1));
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  }
  function choice(arr,rng){ return arr[Math.floor(rng()*arr.length)]; }
  function isGradable(q){ return q.type==='mcq' || (q.type==='calc' && q.options && q.options.length) || q.type==='tf'; }

  function modPow(base, exp, mod){
    let b = BigInt(base), e = BigInt(exp), m = BigInt(mod), r = 1n;
    while(e>0n){ if(e&1n) r=(r*b)%m; b=(b*b)%m; e >>= 1n; }
    return Number(r);
  }
  function egcd(a,b){
    if(b===0) return [a,1,0];
    const [g,x1,y1] = egcd(b, a % b);
    return [g, y1, x1 - Math.floor(a/b)*y1];
  }
  function modInv(a,m){
    const [g,x] = egcd(a,m);
    if(g!==1) return null;
    return ((x % m)+m)%m;
  }
  function gcd(a,b){ while(b){ [a,b]=[b,a%b]; } return Math.abs(a); }

  function caesar(text, k, decrypt=false){
    const shift = decrypt ? (26-k) : k;
    return text.toUpperCase().replace(/[A-Z]/g, ch => String.fromCharCode((ch.charCodeAt(0)-65+shift)%26+65));
  }

  function dynamicQuestions(seed, count=80){
    if(getSubject() === 'qtm') return networkDynamicQuestions(seed, count);
    const rng = rngFromSeed('dynamic-'+seed);
    const qs = [];
    const words = ['UIT','NETWORK','SECURITY','CLOUD','FIREWALL','PACKET','CRYPTO','MALWARE'];
    for(let i=0;i<6;i++){
      const p = choice(words,rng), k = 1 + Math.floor(rng()*24), c = caesar(p,k);
      qs.push({id:`DYN-C-${i}`, type:'calc', lesson:'Bài 3', topic:'Caesar', difficulty:2,
        question:`Mã hóa Caesar plaintext "${p}" với khóa k=${k}. Ciphertext là gì?`,
        options: shuffle([c, caesar(p,(k+1)%26), caesar(p,(k+2)%26), p, caesar(p,(26-k)%26)],rng),
        answer:null, explanation:`Áp dụng C=(p+k) mod 26 với k=${k}. Kết quả đúng: ${c}.`, computedAnswer:c});
    }
    const rsaSets = [
      {p:11,q:17,e:7,M:5}, {p:7,q:11,e:7,M:9}, {p:13,q:17,e:5,M:10}, {p:5,q:11,e:3,M:7}, {p:17,q:19,e:5,M:12}
    ];
    for(let i=0;i<5;i++){
      const s = choice(rsaSets,rng), n=s.p*s.q, phi=(s.p-1)*(s.q-1), d=modInv(s.e,phi), C=modPow(s.M,s.e,n);
      qs.push({id:`DYN-RSA-${i}`, type:'calc', lesson:'Bài 4', topic:'RSA', difficulty:3,
        question:`RSA nhỏ: p=${s.p}, q=${s.q}, e=${s.e}, M=${s.M}. Giá trị n, φ(n), d và ciphertext C là gì?`,
        options: [], answer:`n=${n}, φ(n)=${phi}, d=${d}, C=${C}`,
        explanation:`n=pq=${n}; φ(n)=(p-1)(q-1)=${phi}; d=e^-1 mod φ(n)=${d}; C=M^e mod n=${C}.`});
    }
    const dhSets = [
      {p:23,g:5,a:6,b:15},{p:29,g:2,a:5,b:12},{p:31,g:3,a:7,b:11},{p:353,g:3,a:97,b:233}
    ];
    for(let i=0;i<5;i++){
      const s = choice(dhSets,rng), A=modPow(s.g,s.a,s.p), B=modPow(s.g,s.b,s.p), K1=modPow(B,s.a,s.p), K2=modPow(A,s.b,s.p);
      qs.push({id:`DYN-DH-${i}`, type:'calc', lesson:'Bài 4', topic:'Diffie-Hellman', difficulty:3,
        question:`Diffie-Hellman: p=${s.p}, g=${s.g}, private a=${s.a}, b=${s.b}. Tính A=g^a mod p, B=g^b mod p và khóa chung K.`,
        options: [], answer:`A=${A}, B=${B}, K=${K1}`,
        explanation:`A=${s.g}^${s.a} mod ${s.p}=${A}; B=${s.g}^${s.b} mod ${s.p}=${B}; K=B^a mod p=A^b mod p=${K1}${K1===K2?'':' (kiểm tra lại K2='+K2+')'}.`});
    }
    const affineAs = [3,5,7,11,15,17,19,21,23,25];
    for(let i=0;i<4;i++){
      const a=choice(affineAs,rng), b=Math.floor(rng()*26), x=Math.floor(rng()*26), y=(a*x+b)%26, inv=modInv(a,26);
      qs.push({id:`DYN-AFF-${i}`, type:'calc', lesson:'Bài 3', topic:'Affine', difficulty:3,
        question:`Affine cipher e(x)=ax+b mod 26 với a=${a}, b=${b}. Nếu plaintext có giá trị x=${x}, ciphertext y là gì? Và a^-1 mod 26 bằng bao nhiêu?`,
        options: [], answer:`y=${y}, a^-1=${inv}`,
        explanation:`y=(${a}×${x}+${b}) mod 26=${y}. Vì gcd(${a},26)=${gcd(a,26)}, nghịch đảo tồn tại và a^-1=${inv}.`});
    }
    for(let i=0;i<4;i++){
      const macLen = choice([32,64,96],rng);
      qs.push({id:`DYN-MAC-${i}`, type:'calc', lesson:'Bài 5', topic:'MAC brute-force', difficulty:3,
        question:`Nếu MAC dài ${macLen} bit, số lần thử vét cạn xấp xỉ để giả mạo MAC là bao nhiêu?`,
        options: shuffle([`2^${macLen}`,`2^${macLen-1}`,`${macLen}^2`,`2×${macLen}`,`2^${macLen+16}`],rng), answer:null,
        computedAnswer:`2^${macLen}`, explanation:`Không gian MAC n bit có khoảng 2^n giá trị. Với n=${macLen}, cần xấp xỉ 2^${macLen} lần thử.`});
    }
    const keyLens = [40,56,64,80,112,128,192,256];
    for(let i=0;i<8;i++){
      const n = keyLens[i];
      qs.push({id:`DYN-KEYSPACE-${i}`, type:'calc', lesson:'Bài 3', topic:'Không gian khóa', difficulty:n>=128?3:2,
        question:`Một hệ mã có khóa ${n} bit. Không gian khóa tối đa là bao nhiêu khả năng?`,
        options: shuffle([`2^${n}`,`${n}^2`,`2×${n}`,`10^${n}`,`2^${Math.max(1,n-8)}`],rng), answer:null,
        computedAnswer:`2^${n}`, explanation:`Khóa n bit có 2 lựa chọn cho mỗi bit, nên tổng số khóa là 2^n. Đây là lý do tăng số bit khóa làm vét cạn khó hơn theo cấp số nhân.`});
    }
    const hashLens = [128,160,224,256,384,512];
    for(let i=0;i<6;i++){
      const n = hashLens[i], birthday = Math.floor(n/2);
      qs.push({id:`DYN-HASH-${i}`, type:'mcq', lesson:'Bài 5', topic:'Hash collision', difficulty:3,
        question:`Với hash ${n} bit, độ phức tạp tấn công tìm collision theo birthday bound xấp xỉ là bao nhiêu?`,
        options: shuffle([`2^${birthday}`,`2^${n}`,`${n} lần`,`2^${n-1}`,`Không thể xảy ra collision`],rng), answer:null,
        computedAnswer:`2^${birthday}`, explanation:`Birthday attack làm chi phí tìm va chạm còn khoảng 2^(n/2), không phải 2^n như dò preimage.`});
    }
    const vigItems = [
      {p:'A', k:'D'}, {p:'N', k:'A'}, {p:'T', k:'M'}, {p:'M', k:'K'}, {p:'G', k:'S'}, {p:'Y', k:'B'}
    ];
    for(let i=0;i<6;i++){
      const item = choice(vigItems,rng);
      const x = item.p.charCodeAt(0)-65, y = item.k.charCodeAt(0)-65;
      const c = String.fromCharCode((x+y)%26+65);
      qs.push({id:`DYN-VIG-${i}`, type:'calc', lesson:'Bài 3', topic:'Vigenere', difficulty:3,
        question:`Vigenere dùng A=0. Nếu plaintext là ${item.p} và ký tự khóa là ${item.k}, ciphertext tương ứng là gì?`,
        options: shuffle([c, item.p, item.k, String.fromCharCode((x+y+1)%26+65), String.fromCharCode((x-y+26)%26+65)],rng), answer:null,
        computedAnswer:c, explanation:`Đổi ${item.p}=${x}, ${item.k}=${y}. C=(${x}+${y}) mod 26=${(x+y)%26}, tương ứng ${c}.`});
    }
    const aclScenarios = [
      {id:'STD', ans:'Gần đích', why:'Standard ACL chỉ xét nguồn nên đặt gần đích để tránh chặn nhầm nhiều luồng.'},
      {id:'EXT', ans:'Gần nguồn', why:'Extended ACL xét nguồn/đích/dịch vụ nên đặt gần nguồn để chặn sớm đúng lưu lượng.'},
      {id:'DENY', ans:'Implicit deny', why:'Nếu không có rule permit phù hợp, gói thường bị chặn bởi deny ngầm cuối danh sách.'},
      {id:'ORDER', ans:'Từ trên xuống', why:'ACL được kiểm tra tuần tự; rule đặc hiệu nên đứng trước rule rộng.'}
    ];
    for(let i=0;i<8;i++){
      const s = choice(aclScenarios,rng);
      qs.push({id:`DYN-ACL-${i}`, type:'mcq', lesson:'Bài 8', topic:'ACL vận dụng', difficulty:3,
        question:`Tình huống ACL ${s.id}: lựa chọn nào đúng nhất?`,
        options: shuffle([s.ans,'Gần mọi router biên','Sau rule permit any','Chỉ trong DMZ','Không cần thứ tự rule'],rng), answer:null,
        computedAnswer:s.ans, explanation:s.why});
    }
    const protocolScenarios = [
      {id:'TLS-CERT', lesson:'Bài 6', ans:'Xác thực certificate server', question:'TLS chống MITM chủ yếu nhờ bước nào ngoài mã hóa kênh?', why:'Mã hóa không đủ nếu public key thuộc attacker; certificate hợp lệ giúp gắn public key với đúng server.'},
      {id:'IPSEC-TUNNEL', lesson:'Bài 6', ans:'Tunnel mode', question:'VPN site-to-site cần bọc cả gói IP nội bộ trong gói mới nên chọn gì?', why:'Tunnel mode bảo vệ cả gói IP gốc và thường dùng giữa gateway.'},
      {id:'WIFI-EVIL', lesson:'Bài 7', ans:'Evil Twin', question:'AP giả cùng SSID nhằm lừa người dùng kết nối là dạng nào?', why:'Evil Twin giả mạo điểm truy cập hợp pháp để đánh cắp thông tin hoặc MITM.'},
      {id:'KERB-TGS', lesson:'Bài 6', ans:'TGS', question:'Trong Kerberos, thành phần nào cấp service ticket sau khi client có TGT?', why:'TGS kiểm tra TGT rồi cấp service ticket cho dịch vụ cụ thể.'}
    ];
    for(let i=0;i<10;i++){
      const s = choice(protocolScenarios,rng);
      qs.push({id:`DYN-PROTO-${i}`, type:'mcq', lesson:s.lesson, topic:'Giao thức bảo mật', difficulty:3,
        question:s.question,
        options: shuffle([s.ans,'MAC address','Caesar shift','Packet flood','Port 31337'],rng), answer:null,
        computedAnswer:s.ans, explanation:s.why});
    }
    // Fix MCQ answer indexes after shuffling
    for(const q of qs){
      if(q.options && q.options.length && q.computedAnswer){
        q.answer = q.options.indexOf(q.computedAnswer);
      }
    }
    return qs.slice(0,count);
  }

  function networkDynamicQuestions(seed, count=80){
    const rng = rngFromSeed('network-dynamic-'+seed);
    const qs = [];
    const shuffleOptions = (correct, wrong) => {
      const options = shuffle([correct].concat(wrong), rng).slice(0,5);
      if(!options.includes(correct)) options[Math.floor(rng()*options.length)] = correct;
      return {options, answer: options.indexOf(correct)};
    };

    const ospfCases = [
      {area:'0', rid:'10.10.10.10', passive:'Gi0/2', net:'10.10.12.0/30'},
      {area:'10', rid:'172.16.255.1', passive:'Vlan20', net:'172.16.20.0/24'},
      {area:'20', rid:'192.168.100.254', passive:'Gi0/1', net:'192.168.40.0/24'}
    ];
    for(let i=0;i<8;i++){
      const s = choice(ospfCases,rng);
      const {options, answer} = shuffleOptions(`Area ${s.area}; router-id ${s.rid}; passive ${s.passive}`, [
        `Area 0; router-id tự sinh; passive tất cả interface`,
        `Area ${s.area}; DR luôn là router có IP thấp nhất`,
        `Chạy EIGRP vì có network ${s.net}`,
        `Sai vì wildcard mask không dùng trong OSPF`
      ]);
      qs.push({
        id:`QTM-DYN-OSPF-${i}`, type:'mcq', lesson:'QTM 3 - OSPF & định tuyến', topic:'Đọc cấu hình OSPF', difficulty:3,
        config:`router ospf 10\n router-id ${s.rid}\n passive-interface default\n no passive-interface Gi0/0\n network ${s.net.replace('/30',' 0.0.0.3').replace('/24',' 0.0.0.255')} area ${s.area}`,
        question:'Kết luận nào đúng nhất khi đọc cấu hình OSPF trên router này?',
        options, answer,
        explanation:'OSPF dùng area theo dòng network, router-id được cấu hình thủ công, passive-interface default làm im lặng toàn bộ interface trừ interface được no passive-interface.'
      });
    }

    const stpCases = [
      {a:'32768:0011.2233.4455', b:'24576:aabb.ccdd.eeff', root:'SW-B'},
      {a:'4096:aaaa.bbbb.cccc', b:'8192:0001.0002.0003', root:'SW-A'},
      {a:'32768:0000.0000.000a', b:'32768:0000.0000.0009', root:'SW-B'}
    ];
    for(let i=0;i<6;i++){
      const s = choice(stpCases,rng);
      const {options, answer} = shuffleOptions(s.root, ['SW-A vì tên ngắn hơn','SW-B vì nhiều port hơn','Không xác định nếu chưa biết VLAN native','Router mới là root bridge']);
      qs.push({
        id:`QTM-DYN-STP-${i}`, type:'mcq', lesson:'QTM 2 - Switching, VLAN, STP', topic:'STP root bridge', difficulty:2,
        context:`Bridge ID SW-A = ${s.a}; Bridge ID SW-B = ${s.b}.`,
        question:'Switch nào sẽ được chọn làm root bridge nếu chỉ xét hai thiết bị này?',
        options, answer,
        explanation:'STP chọn Bridge ID nhỏ nhất: priority thấp hơn thắng; nếu priority bằng nhau thì MAC address thấp hơn thắng.'
      });
    }

    const cidrCases = [
      {net:'10.20.30.64/26', usable:'62', first:'10.20.30.65', last:'10.20.30.126', broadcast:'10.20.30.127'},
      {net:'172.16.8.128/27', usable:'30', first:'172.16.8.129', last:'172.16.8.158', broadcast:'172.16.8.159'},
      {net:'192.168.50.16/28', usable:'14', first:'192.168.50.17', last:'192.168.50.30', broadcast:'192.168.50.31'},
      {net:'10.10.10.0/30', usable:'2', first:'10.10.10.1', last:'10.10.10.2', broadcast:'10.10.10.3'}
    ];
    for(let i=0;i<8;i++){
      const s = choice(cidrCases,rng);
      const correct = `${s.usable} host; usable ${s.first} - ${s.last}; broadcast ${s.broadcast}`;
      const {options, answer} = shuffleOptions(correct, [
        `${s.usable} host; usable ${s.first} - ${s.broadcast}; không có broadcast`,
        `${Number(s.usable)+2} host; usable ${s.first} - ${s.last}; broadcast ${s.broadcast}`,
        `${Math.max(1,Number(s.usable)-2)} host; usable ${s.first} - ${s.last}; broadcast ${s.last}`,
        `Không chia subnet được vì ${s.net} là địa chỉ private`
      ]);
      qs.push({
        id:`QTM-DYN-CIDR-${i}`, type:'mcq', lesson:'QTM 1 - IP, subnet, dịch vụ nền', topic:'CIDR/VLSM', difficulty:2,
        question:`Với subnet ${s.net}, phương án nào đúng?`,
        options, answer,
        explanation:'Với subnet IPv4, số host usable thường là 2^(bit host)-2; địa chỉ đầu là network, địa chỉ cuối là broadcast.'
      });
    }

    const dockerCases = [
      {port:'8080:80', seen:'host port 8080 chuyển vào container port 80'},
      {port:'8443:443', seen:'host port 8443 chuyển vào container port 443'},
      {port:'5433:5432', seen:'host port 5433 chuyển vào container port 5432'}
    ];
    for(let i=0;i<5;i++){
      const s = choice(dockerCases,rng);
      const {options, answer} = shuffleOptions(s.seen, [
        'container tự mở toàn bộ port ra Internet',
        'host port và container port phải luôn giống nhau',
        'chỉ container trong cùng bridge network mới truy cập được',
        'đây là bind mount volume, không liên quan network'
      ]);
      qs.push({
        id:`QTM-DYN-DOCKER-${i}`, type:'mcq', lesson:'QTM 6 - Docker, Kubernetes, cloud', topic:'Docker networking', difficulty:2,
        config:`services:\n  web:\n    image: nginx:alpine\n    ports:\n      - "${s.port}"`,
        question:'Đọc cấu hình Docker Compose, nhận định nào đúng?',
        options, answer,
        explanation:'Cú pháp HOST:CONTAINER trong ports ánh xạ cổng trên máy host vào cổng bên trong container.'
      });
    }

    const aclCases = [
      {wild:'0.0.0.255', match:'một mạng /24'},
      {wild:'0.0.0.3', match:'một mạng /30'},
      {wild:'0.0.15.255', match:'một khối /20'}
    ];
    for(let i=0;i<5;i++){
      const s = choice(aclCases,rng);
      const {options, answer} = shuffleOptions(s.match, ['một host duy nhất','toàn bộ Internet','chỉ gói TCP SYN','chỉ VLAN native']);
      qs.push({
        id:`QTM-DYN-ACL-${i}`, type:'mcq', lesson:'QTM 4 - ACL, NAT, firewall', topic:'Wildcard mask', difficulty:2,
        question:`Trong ACL Cisco, wildcard mask ${s.wild} thường khớp với phạm vi nào?`,
        options, answer,
        explanation:'Wildcard mask là phần đảo của subnet mask: bit 0 phải khớp chính xác, bit 1 được bỏ qua.'
      });
    }

    return qs.slice(0,count);
  }

  function initFilters(){
    const lessons = [...new Set(baseQuestions().map(q=>q.lesson))];
    const box = $('lessonFilters');
    box.innerHTML = lessons.map(l => `<label><input type="checkbox" name="lesson" value="${escapeHtml(l)}" checked /> ${escapeHtml(l)}</label>`).join('');
    $('bankCount').textContent = baseQuestions().length + dynamicQuestions('count-preview', 80).length;
  }

  function getSelected(name){
    return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(x=>x.value);
  }

  function getSubject(){
    return $('subject')?.value || 'atmm';
  }

  function getCompletedExams(){
    try{
      const saved = JSON.parse(localStorage.getItem(COMPLETED_EXAMS_KEY) || '{}');
      const values = Array.isArray(saved[getSubject()]) ? saved[getSubject()] : [];
      return new Set(values.map(Number).filter(n => n >= 1 && n <= EXAM_CATALOG_SIZE));
    } catch(error){
      return new Set();
    }
  }

  function markCurrentExamCompleted(){
    if(currentExamSets.length !== 1) return;
    const examNo = Math.max(1, Math.min(EXAM_CATALOG_SIZE, parseInt($('examNumber')?.value, 10) || 1));
    try{
      const saved = JSON.parse(localStorage.getItem(COMPLETED_EXAMS_KEY) || '{}');
      const completed = new Set(Array.isArray(saved[getSubject()]) ? saved[getSubject()].map(Number) : []);
      completed.add(examNo);
      saved[getSubject()] = [...completed].sort((a,b) => a - b);
      localStorage.setItem(COMPLETED_EXAMS_KEY, JSON.stringify(saved));
    } catch(error){
      // The exam still works when browser storage is disabled.
    }
    renderExamPicker();
  }

  function renderExamPicker(){
    const picker = $('examPicker');
    if(!picker) return;
    const current = Math.max(1, Math.min(EXAM_CATALOG_SIZE, parseInt($('examNumber')?.value, 10) || 1));
    const completed = getCompletedExams();
    picker.innerHTML = Array.from({length:EXAM_CATALOG_SIZE}, (_, index) => {
      const examNo = index + 1;
      const isCompleted = completed.has(examNo);
      const classes = ['exam-pick', isCompleted ? 'completed' : 'new', examNo === current ? 'active' : ''].filter(Boolean).join(' ');
      return `<button type="button" class="${classes}" data-exam-number="${examNo}" aria-pressed="${examNo === current}">
        <strong>Đề ${String(examNo).padStart(2, '0')}</strong>
        <small>${isCompleted ? 'Đã làm' : 'Mới'}</small>
      </button>`;
    }).join('');
    if($('examPickerSummary')){
      $('examPickerSummary').textContent = `${EXAM_CATALOG_SIZE} đề · ${completed.size} đề đã làm · ${EXAM_CATALOG_SIZE - completed.size} đề mới`;
    }
  }

  function selectExamNumber(examNo){
    const normalized = Math.max(1, Math.min(EXAM_CATALOG_SIZE, Number(examNo) || 1));
    if($('examNumber')) $('examNumber').value = normalized;
    renderExamPicker();
    generateExam();
  }

  function selectNextNewExam(){
    const completed = getCompletedExams();
    const current = Math.max(1, Math.min(EXAM_CATALOG_SIZE, parseInt($('examNumber')?.value, 10) || 1));
    for(let offset = 1; offset <= EXAM_CATALOG_SIZE; offset++){
      const candidate = ((current - 1 + offset) % EXAM_CATALOG_SIZE) + 1;
      if(!completed.has(candidate)){
        selectExamNumber(candidate);
        return;
      }
    }
    selectExamNumber((current % EXAM_CATALOG_SIZE) + 1);
  }

  function baseQuestions(){
    if(getSubject() === 'qtm' && typeof NETWORK_QUESTION_BANK !== 'undefined'){
      return NETWORK_QUESTION_BANK;
    }
    return QUESTION_BANK.concat(SUPPLEMENTAL_QUESTIONS);
  }

  function syncSeedFromExamNumber(){
    const input = $('examNumber');
    const examNo = Math.max(1, Math.min(EXAM_CATALOG_SIZE, parseInt(input?.value,10) || 1));
    if(input) input.value = examNo;
    const seed = `DE-${examNo}`;
    if($('seed')) $('seed').value = seed;
    renderExamPicker();
    return seed;
  }

  function generateExam(){
    stopTimer();
    answersVisible = false;
    examSubmitted = false;
    userAnswers = {};
    document.body.classList.remove('exam-submitted');
    $('examResult')?.classList.add('hidden');
    $('toggleAnswersBtn').textContent = 'Hiện đáp án';
    const mode = $('mode').value;
    const subject = getSubject();
    const batchMode = mode === 'qtm-batch';
    const examMode = !batchMode && $('answerMode')?.value === 'exam';
    let count = parseInt($('count').value,10) || 40;
    if(mode==='docx') count = 40;
    if(batchMode) count = 28;
    if(mode==='quick') count = Math.min(count,20);
    $('count').value = count;

    const seed = syncSeedFromExamNumber();
    const variantCount = batchMode ? 25 : (examMode ? 1 : Math.max(1, Math.min(30, parseInt($('variantCount')?.value,10) || 1)));
    if($('variantCount')) $('variantCount').value = variantCount;
    const minDiff = parseInt($('difficulty').value,10);
    const lessons = getSelected('lesson');
    let types = getSelected('qtype');
    const previousIds = new Set(lastExamIds);

    if(mode==='docx') types = ['mcq'];
    if(mode==='hard') types = types.filter(t => t !== 'tf' && t !== 'fill');
    if(types.length===0) types=['mcq'];

    let pool = baseQuestions().filter(q => lessons.includes(q.lesson) && q.difficulty >= minDiff && types.includes(q.type));
    pool = pool.concat(dynamicQuestions(seed, 80).filter(q => lessons.includes(q.lesson) && q.difficulty >= minDiff && types.includes(q.type)));
    if(mode==='docx') pool = pool.filter(q=>q.type==='mcq');
    if(mode==='hard') pool = pool.filter(q=>q.difficulty>=3 || q.type==='calc');

    currentExamSets = [];
    for(let v=0; v<variantCount; v++){
      const variantSeed = variantCount === 1 ? seed : `${seed}-DE${v+1}`;
      const rng = rngFromSeed(variantSeed+'-'+mode+'-'+count);
      let shuffled = shuffle(pool, rng);
      if(variantCount > 1) shuffled = avoidRecentRepeats(shuffled, previousIds, count);
      if(subject === 'qtm' && (mode === 'mixed' || batchMode)) shuffled = balanceQtmSelection(shuffled, count, rng);
      if(shuffled.length < count){
        const fallback = shuffle(baseQuestions().concat(dynamicQuestions(variantSeed+'fallback',80)), rng)
          .filter(q => (mode==='docx'? q.type==='mcq': true) && lessons.includes(q.lesson) && q.difficulty >= minDiff && types.includes(q.type));
        const seen = new Set(shuffled.map(q=>q.id));
        for(const q of fallback){ if(!seen.has(q.id)){ shuffled.push(q); seen.add(q.id); } if(shuffled.length>=count) break; }
      }
      currentExamSets.push({
        label: variantCount === 1 ? `Đề ${parseInt($('examNumber')?.value,10) || 1}` : `Đề ${v+1}`,
        seed: variantSeed,
        questions: selectExamQuestions(subject, shuffled, pool, count, rng).map((q,i)=>prepareQuestion(q, i, rng, v))
      });
    }
    currentExam = currentExamSets.flatMap(set => set.questions.map(q => ({...q, variantSeed:set.seed, variantLabel:set.label})));
    lastExamIds = currentExam.map(q => q.caseId || q.id);
    renderExam();
    renderStats();
    renderQuestionNavigator();
    updateAnswerModeUI();
    if(examMode) startTimer();
    document.querySelector('.content')?.scrollIntoView({behavior:'smooth', block:'start'});
  }

  function avoidRecentRepeats(shuffled, previousIds, count){
    if(!previousIds.size) return shuffled;
    const fresh = shuffled.filter(q => !previousIds.has(q.caseId || q.id));
    const repeated = shuffled.filter(q => previousIds.has(q.caseId || q.id));
    return fresh.length >= count ? fresh.concat(repeated) : fresh.concat(repeated);
  }

  function balanceQtmSelection(shuffled, count, rng){
    const medium = shuffle(shuffled.filter(q => q.difficulty <= 2), rng);
    const hard = shuffle(shuffled.filter(q => q.difficulty >= 3), rng);
    const picked = [];
    const seen = new Set();
    const take = (list) => {
      while(list.length){
        const q = list.shift();
        if(seen.has(q.id)) continue;
        picked.push(q);
        seen.add(q.id);
        return true;
      }
      return false;
    };
    while(picked.length < count && (medium.length || hard.length)){
      take(medium);
      if(picked.length >= count) break;
      take(medium);
      if(picked.length >= count) break;
      take(hard);
    }
    for(const q of shuffled){
      if(picked.length >= count) break;
      if(seen.has(q.id)) continue;
      picked.push(q);
      seen.add(q.id);
    }
    return picked.concat(shuffled.filter(q => !seen.has(q.id)));
  }

  function expandGroupedSelection(shuffled, pool, count, rng){
    const byCase = {};
    for(const q of pool){
      if(!q.caseId) continue;
      if(!byCase[q.caseId]) byCase[q.caseId] = [];
      byCase[q.caseId].push(q);
    }
    const selected = [];
    const seen = new Set();
    for(const q of shuffled){
      if(seen.has(q.id)) continue;
      const block = q.caseId ? shuffle(byCase[q.caseId] || [q], rng) : [q];
      for(const item of block){
        if(seen.has(item.id)) continue;
        selected.push(item);
        seen.add(item.id);
        if(selected.length >= count) return selected;
      }
    }
    return selected;
  }

  function selectExamQuestions(subject, shuffled, pool, count, rng){
    if(subject !== 'qtm') return orderExamQuestions(expandGroupedSelection(shuffled, pool, count, rng));
    return composeNetworkAdminExam(shuffled, pool, count, rng);
  }

  function composeNetworkAdminExam(shuffled, pool, count, rng){
    const essayTarget = count >= 24 ? 3 : (count >= 12 ? 2 : 1);
    const objectiveTarget = Math.max(0, count - essayTarget);
    const seen = new Set();
    const objectivePool = prioritizeQtmSlideTheory(
      shuffled.filter(q => q.type === 'mcq' || q.type === 'tf' || q.type === 'match' || q.type === 'fill'),
      objectiveTarget,
      rng
    );
    const selected = [];
    for(const q of objectivePool){
      if(selected.length >= objectiveTarget) break;
      if(seen.has(q.id)) continue;
      selected.push(q);
      seen.add(q.id);
    }
    if(selected.length < objectiveTarget){
      for(const q of shuffle(pool.filter(q => q.type !== 'short' && q.type !== 'calc'), rng)){
        if(selected.length >= objectiveTarget) break;
        if(seen.has(q.id)) continue;
        selected.push(q);
        seen.add(q.id);
      }
    }

    const essayPool = shuffle(pool.filter(q => q.type === 'short'), rng).sort((a,b) => {
      const aFinal = /ESSAY-(FINAL|END2END)/.test(String(a.id || '')) ? 0 : 1;
      const bFinal = /ESSAY-(FINAL|END2END)/.test(String(b.id || '')) ? 0 : 1;
      const aMedia = a.image ? 0 : 1;
      const bMedia = b.image ? 0 : 1;
      return aFinal - bFinal || essaySlideScore(a) - essaySlideScore(b) || aMedia - bMedia;
    });
    const essays = [];
    for(const q of essayPool){
      if(essays.length >= essayTarget) break;
      if(seen.has(q.id)) continue;
      essays.push(q);
      seen.add(q.id);
    }
    return selected.concat(essays).slice(0, count);
  }

  function prioritizeQtmSlideTheory(questions, targetCount, rng){
    const isObjective = q => q.type === 'mcq' || q.type === 'tf' || q.type === 'match' || q.type === 'fill';
    const core = questions.filter(q => isObjective(q) && isCoreSlideLesson(q.lesson));
    const extended = questions.filter(q => isObjective(q) && !isCoreSlideLesson(q.lesson));
    const coreTarget = Math.min(targetCount, Math.max(0, Math.round(targetCount * 0.8)));
    const selected = [];
    const seen = new Set();
    const takeFrom = (list, limit) => {
      const balanced = balanceQtmSelection(list, limit, rng);
      for(const q of balanced){
        if(selected.length >= limit) break;
        if(seen.has(q.id)) continue;
        selected.push(q);
        seen.add(q.id);
      }
    };
    takeFrom(core, coreTarget);
    const extendedTarget = targetCount - selected.length;
    takeFrom(extended, selected.length + extendedTarget);
    if(selected.length < targetCount){
      for(const q of balanceQtmSelection(questions, targetCount, rng)){
        if(selected.length >= targetCount) break;
        if(seen.has(q.id)) continue;
        selected.push(q);
        seen.add(q.id);
      }
    }
    return selected.concat(questions.filter(q => !seen.has(q.id)));
  }

  function isCoreSlideLesson(lesson){
    return /^QTM [1-5]\b/.test(String(lesson || ''));
  }

  function essaySlideScore(q){
    const id = String(q.id || '');
    const lesson = String(q.lesson || '');
    if(id.includes('END2END')) return 0;
    if(/QTM [1-5]\b/.test(lesson)) return 1;
    if(/cloud|kubernetes|docker/i.test(`${lesson} ${q.topic || ''}`)) return 3;
    return 2;
  }

  function orderExamQuestions(questions){
    return questions
      .map((q, index) => ({q, index}))
      .sort((a, b) => {
        const aEssay = a.q.type === 'short' ? 1 : 0;
        const bEssay = b.q.type === 'short' ? 1 : 0;
        return aEssay - bEssay || a.index - b.index;
      })
      .map(item => item.q);
  }

  function prepareQuestion(q, index, rng, variantIndex=0){
    const copy = JSON.parse(JSON.stringify(q));
    copy.examIndex = index + 1;
    copy.uid = `v${variantIndex}-${copy.id}-${index}`;
    if(copy.type==='mcq' || (copy.type==='calc' && copy.options && copy.options.length)){
      const correctValue = copy.options[copy.answer];
      const opts = isNetworkQuestion(copy) ? networkBalancedOptions(copy, correctValue, rng) : shuffle(copy.options, rng).slice(0,5);
      // Ensure correct still included
      if(!opts.includes(correctValue)) opts[Math.floor(rng()*opts.length)] = correctValue;
      copy.options = opts;
      copy.answer = opts.indexOf(correctValue);
    }
    if(copy.type==='match'){
      const left = copy.answer.map(p=>p[0]);
      const right = shuffle(copy.answer.map(p=>p[1]), rng);
      copy.matchLeft = left;
      copy.matchRight = right;
    }
    return copy;
  }

  function isNetworkQuestion(q){
    return String(q.lesson || '').startsWith('QTM ');
  }

  function networkBalancedOptions(q, correctValue, rng){
    const existing = q.options.filter(o => o !== correctValue);
    const generated = networkDistractors(q, correctValue);
    const candidates = uniqueStrings(existing.concat(generated))
      .filter(o => o && o !== correctValue)
      .filter(o => !tooSimilarOption(o, correctValue));
    const selected = [];
    const targetLen = String(correctValue).length;
    const shuffled = shuffle(candidates, rng).sort((a,b) => Math.abs(a.length - targetLen) - Math.abs(b.length - targetLen));
    for(const item of shuffled){
      if(selected.length >= 4) break;
      if(selected.some(prev => tooSimilarOption(prev, item))) continue;
      selected.push(item);
    }
    while(selected.length < 4){
      selected.push(genericNetworkDistractor(q, selected.length));
    }
    return shuffle([correctValue].concat(selected.slice(0,4)), rng);
  }

  function uniqueStrings(items){
    const seen = new Set();
    const out = [];
    for(const item of items){
      const text = String(item || '').trim();
      const key = text.toLowerCase();
      if(!text || seen.has(key)) continue;
      seen.add(key);
      out.push(text);
    }
    return out;
  }

  function tooSimilarOption(a,b){
    const x = String(a).toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
    const y = String(b).toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
    if(!x || !y) return false;
    if(x === y) return true;
    const short = x.length < y.length ? x : y;
    const long = x.length < y.length ? y : x;
    return short.length > 16 && long.includes(short);
  }

  function networkDistractors(q, correctValue){
    const text = `${q.lesson || ''} ${q.topic || ''} ${q.question || ''} ${q.config || ''}`.toLowerCase();
    const d = [];
    const add = (...items) => d.push(...items);
    if(/vlan|trunk|stp|etherchannel|switch/.test(text)){
      add(
        'Kiểm tra VLAN/trunk là cần thiết, nhưng kết luận này bỏ qua gateway layer 3 hoặc ACL nên chưa đủ đúng',
        'Có thể đúng nếu lỗi chỉ nằm ở access port, nhưng không giải thích được toàn bộ luồng end-to-end',
        'Tập trung vào STP/root bridge nghe hợp lý, nhưng không phải nguyên nhân trực tiếp trong dữ kiện đã cho',
        'Đổi native VLAN có thể xử lý một số lỗi trunk, nhưng không phải bước đầu tiên nếu đề hỏi định tuyến liên VLAN'
      );
    }
    if(/ospf|route|routing|default route|định tuyến|router/.test(text)){
      add(
        'Kiểm tra route là đúng hướng, nhưng phương án này thiếu điều kiện route ngược hoặc adjacency nên chưa chính xác nhất',
        'OSPF area 0 là quan trọng, nhưng không phải mọi lỗi routing đều do thiếu area 0',
        'Default route giúp ra Internet, nhưng không thay thế route nội bộ hoặc route tới mạng chi nhánh',
        'Ping trực tiếp chỉ chứng minh reachability cơ bản, chưa đủ kết luận bảng định tuyến đã đúng'
      );
    }
    if(/acl|firewall|nat|dmz|iptables|security group/.test(text)){
      add(
        'Mở rule rộng có thể làm thông mạng, nhưng sai nguyên tắc least privilege và không phải đáp án an toàn nhất',
        'NAT xử lý luồng ra Internet, nhưng không nên áp dụng bừa cho traffic nội bộ hoặc VPN',
        'ACL đúng chiều là quan trọng, nhưng phương án này bỏ qua thứ tự rule và implicit deny',
        'Chỉ kiểm tra service đích là chưa đủ nếu firewall hoặc route hai chiều đang chặn'
      );
    }
    if(/docker|container|compose|kubernetes|kubectl|pod|service|ingress|cloud/.test(text)){
      add(
        'Pod/container chạy không đồng nghĩa ứng dụng đã sẵn sàng nhận traffic qua Service hoặc Ingress',
        'Mở port public nghe có vẻ xử lý nhanh, nhưng bỏ qua selector, targetPort hoặc security group',
        'Scale thêm replica có thể tăng tải, nhưng không sửa lỗi cấu hình route/service/secret/probe',
        'Dùng image mới hơn không phải đáp án trọng tâm nếu dữ kiện đang nói về network hoặc endpoint'
      );
    }
    if(/vpn|openvpn|zabbix|smb|nfs|ftp|linux|systemd|ssh|ad ds|guacamole/.test(text)){
      add(
        'Service up là điều kiện cần, nhưng chưa đủ nếu route, firewall hoặc phân quyền vẫn sai',
        'Mở port toàn Internet có thể làm truy cập được, nhưng là cách xử lý không an toàn trong quản trị mạng',
        'Đổi DNS có thể cần khi truy cập bằng tên, nhưng không giải quyết lỗi route/firewall theo IP',
        'Chỉ xem log ứng dụng là chưa đủ nếu gói tin chưa tới được server qua tunnel hoặc firewall'
      );
    }
    if(!d.length){
      add(
        'Nhận định này đúng một phần nhưng thiếu điều kiện quan trọng trong dữ kiện đề bài',
        'Cách này có thể dùng khi troubleshoot, nhưng chưa phải nguyên nhân hoặc giải pháp sát nhất',
        'Phương án này xử lý ở tầng khác nên không trả lời đúng trọng tâm câu hỏi',
        'Kết luận này quá rộng, dễ đúng trong vài trường hợp nhưng không đúng nhất với tình huống đã cho'
      );
    }
    return d.filter(item => item !== correctValue);
  }

  function genericNetworkDistractor(q, index){
    const items = [
      'Đúng trong một số bài lab, nhưng chưa đủ điều kiện để kết luận là đáp án chính của câu này',
      'Nghe hợp lý về mặt vận hành, nhưng xử lý sai tầng giao thức so với dữ kiện đề bài',
      'Có thể là bước kiểm tra phụ, nhưng không giải thích được nguyên nhân trọng tâm',
      'Phương án này quá rộng và bỏ qua chi tiết cấu hình đang được hỏi'
    ];
    return items[index % items.length];
  }

  function renderExam(){
    const mode = $('mode').value;
    const subject = getSubject();
    const config = subjectConfig[subject] || subjectConfig.atmm;
    const mcqCount = currentExam.filter(q => q.type==='mcq' || (q.type==='calc' && q.options && q.options.length)).length;
    const perExamCount = currentExamSets[0]?.questions.length || currentExam.length;
    const examMode = $('answerMode')?.value === 'exam';
    const duration = getExamDurationMinutes();
    const examLabel = currentExamSets.length > 1 ? `${currentExamSets.length} đề` : (currentExamSets[0]?.label || `Đề ${$('examNumber')?.value || 1}`);
    $('examMeta').innerHTML = `
      <div>
        <h2>${mode==='docx' && subject==='atmm'?'ĐỀ THI MÔ PHỎNG - 40 CÂU':config.examTitle}</h2>
        <p>${escapeHtml(examLabel)} · ${examMode ? `Thời gian thi: ${duration} phút` : `Thời gian gợi ý: ${mode==='docx'?'75 phút': Math.max(15, Math.round(perExamCount*1.8))+' phút'}`} · Tổng câu: ${currentExam.length}</p>
      </div>
      <span class="meta-chip">${escapeHtml(config.label)} · ${mcqCount} câu trắc nghiệm</span>
    `;

    $('answerGrid').innerHTML = mode==='docx' && subject==='atmm' ? buildBlankAnswerGrid(40) : '';
    const out = $('examOutput');
    out.innerHTML = '';
    const sets = currentExamSets.length ? currentExamSets : [{label:'', seed, questions:currentExam}];
    for(const set of sets){
      if(sets.length > 1){
        const title = document.createElement('div');
        title.className = 'exam-set-title';
        title.innerHTML = `<h3>${escapeHtml(set.label)}</h3><p>Số câu: ${set.questions.length}</p>`;
        out.appendChild(title);
      }
      for(const q of set.questions){ out.appendChild(renderQuestion(q)); }
    }
  }

  function renderQuestion(q){
    const tpl = $('questionTemplate').content.cloneNode(true);
    tpl.querySelector('.question-card').dataset.qid = q.uid;
    tpl.querySelector('.q-number').textContent = `Câu ${q.examIndex}.`;
    tpl.querySelector('.lesson').textContent = q.lesson;
    tpl.querySelector('.type').textContent = typeLabel[q.type] || q.type;
    tpl.querySelector('.difficulty').textContent = diffLabel[q.difficulty] || 'Khó';
    let questionHtml = '';
    if(q.context){
      questionHtml += `<div class="q-context"><strong>Dữ kiện chung:</strong> ${escapeHtml(q.context)}</div>`;
    }
    if(q.config){
      questionHtml += `<pre class="q-config">${escapeHtml(q.config)}</pre>`;
    }
    if(q.image){
      questionHtml += `<figure class="q-figure"><img src="${escapeAttr(q.image.src)}" alt="${escapeAttr(q.image.alt || 'Hình minh họa câu hỏi')}" />${q.image.caption ? `<figcaption>${escapeHtml(q.image.caption)}</figcaption>` : ''}</figure>`;
    }
    questionHtml += `<div>${escapeHtml(q.question).replace(/________/g, '<span class="fill-line"></span>').replace(/\n/g, '<br>')}</div>`;
    tpl.querySelector('.q-text').innerHTML = questionHtml;
    const body = tpl.querySelector('.q-body');
    if(q.type==='mcq' || (q.type==='calc' && q.options && q.options.length)){
      body.innerHTML = `<ul class="options option-buttons">${q.options.map((o,i)=>`<li><button class="option-btn" type="button" data-qid="${escapeAttr(q.uid)}" data-choice="${i}"><span class="letter">${letters[i]}.</span>${escapeHtml(o)}</button></li>`).join('')}</ul>`;
    } else if(q.type==='tf'){
      body.innerHTML = `<ul class="options option-buttons"><li><button class="option-btn" type="button" data-qid="${escapeAttr(q.uid)}" data-choice="true"><span class="letter">A.</span>Đúng</button></li><li><button class="option-btn" type="button" data-qid="${escapeAttr(q.uid)}" data-choice="false"><span class="letter">B.</span>Sai</button></li></ul>`;
    } else if(q.type==='match'){
      body.innerHTML = buildMatchHtml(q);
    } else if(q.type==='short'){
      body.innerHTML = '<div class="short-lines"><p>Trả lời: ............................................................................................................................</p><p>........................................................................................................................................</p></div>';
    } else if(q.type==='fill'){
      body.innerHTML = '<p class="hint">Điền thuật ngữ/cụm từ đúng vào chỗ trống.</p>';
    } else if(q.type==='calc'){
      body.innerHTML = '<div class="short-lines"><p>Bài làm: ............................................................................................................................</p><p>........................................................................................................................................</p></div>';
    }
    const ans = tpl.querySelector('.answer');
    ans.innerHTML = answerHtml(q);
    if(answersVisible) ans.classList.remove('hidden');
    return tpl;
  }

  function answerHtml(q, selectedChoice=null){
    let a = '';
    if(q.type==='mcq' || (q.type==='calc' && q.options && q.options.length)) a = `${letters[q.answer]}. ${escapeHtml(q.options[q.answer])}`;
    else if(q.type==='tf') a = q.answer ? 'Đúng' : 'Sai';
    else if(q.type==='match') a = q.answer.map(p=>`${escapeHtml(p[0])} → ${escapeHtml(p[1])}`).join('; ');
    else a = escapeHtml(String(q.answer));
    const wrong = wrongFeedbackHtml(q, selectedChoice);
    return `${wrong}<strong>Đáp án:</strong> ${a}<br><strong>Giải thích:</strong> ${escapeHtml(richExplanation(q))}`;
  }

  function wrongFeedbackHtml(q, selectedChoice){
    if(selectedChoice === null || selectedChoice === undefined) return '';
    if(!isGradable(q) || isCorrect(q, selectedChoice)) return '';
    let chosenText = '';
    if(q.type === 'tf') chosenText = selectedChoice ? 'Đúng' : 'Sai';
    else if(q.options && q.options[selectedChoice] !== undefined) chosenText = `${letters[selectedChoice]}. ${q.options[selectedChoice]}`;
    if(!chosenText) return '';
    return `<div class="wrong-feedback"><strong>Bạn chọn:</strong> ${escapeHtml(chosenText)}<br><strong>Vì sao sai:</strong> ${escapeHtml(explainWrongChoice(q, selectedChoice))}</div>`;
  }

  function explainWrongChoice(q, selectedChoice){
    if(q.optionFeedback && q.optionFeedback[selectedChoice]) return q.optionFeedback[selectedChoice];
    const chosen = q.type === 'tf' ? (selectedChoice ? 'Đúng' : 'Sai') : String(q.options?.[selectedChoice] || '');
    const correct = q.type === 'tf' ? (q.answer ? 'Đúng' : 'Sai') : String(q.options?.[q.answer] || '');
    const text = `${q.lesson || ''} ${q.topic || ''} ${q.question || ''} ${q.config || ''} ${chosen}`.toLowerCase();
    const reasons = [
      {keys:['vlan','trunk','native','stp','etherchannel','switch'], reason:'phương án này chỉ nhìn một phần layer 2 hoặc nhầm vai trò access/trunk/STP; câu hỏi cần đối chiếu cả VLAN, gateway và luồng đi qua thiết bị.'},
      {keys:['ospf','route','routing','default','router','area'], reason:'phương án này bỏ sót điều kiện định tuyến như area, adjacency, longest-prefix, default route hoặc route ngược; vì vậy chưa giải thích đúng luồng end-to-end.'},
      {keys:['acl','firewall','nat','dmz','iptables','security group'], reason:'phương án này dễ làm thông mạng nhưng sai hoặc thiếu về thứ tự rule, chiều áp ACL/NAT, implicit deny hoặc nguyên tắc least privilege.'},
      {keys:['docker','container','kubernetes','kubectl','pod','service','ingress','cloud'], reason:'phương án này nhầm giữa thành phần đang chạy và đường truy cập thật; với container/Kubernetes phải kiểm selector, port/targetPort, endpoint, probe và security group.'},
      {keys:['vpn','openvpn','zabbix','smb','nfs','ftp','linux','ssh','systemd','ad ds','guacamole'], reason:'phương án này chỉ xử lý service hoặc ứng dụng, nhưng tình huống còn phụ thuộc route, firewall, phân quyền, DNS hoặc luồng qua VPN/server.'},
      {keys:['dhcp','dns','subnet','gateway','ipv6','arp'], reason:'phương án này nhầm vai trò dịch vụ nền; cần phân biệt địa chỉ IP/subnet/gateway với phân giải tên, DHCP lease và reachability layer 2/3.'}
    ];
    const matched = reasons.find(item => item.keys.some(k => text.includes(k)));
    const base = matched ? matched.reason : 'phương án này có thể đúng trong vài ngữ cảnh khác, nhưng không thỏa điều kiện trọng tâm của dữ kiện đề bài.';
    return `${base} Đáp án đúng hướng tới: ${correct}.`;
  }

  function richExplanation(q){
    const base = String(q.explanation || '').trim();
    if(base.length >= 90) return base;
    const text = `${q.topic || ''} ${q.question || ''}`.toLowerCase();
    const hints = [
      {keys:['replay','otp','ticket'], hint:'Điểm bẫy là dữ liệu cũ vẫn có thể hợp lệ nếu hệ thống không kiểm tra nonce, timestamp hoặc trạng thái đã dùng.'},
      {keys:['mitm','diffie','hellman','dh'], hint:'Diffie-Hellman chỉ tạo khóa chung; muốn chống người đứng giữa phải xác thực khóa công khai/endpoint bằng chữ ký, certificate hoặc cơ chế tương đương.'},
      {keys:['mac','hmac'], hint:'MAC/HMAC xác thực bằng khóa bí mật chia sẻ, nên kiểm tra toàn vẹn và nguồn gửi trong phạm vi các bên cùng biết khóa.'},
      {keys:['chữ ký','digital signature','non-repudiation'], hint:'Chữ ký số khác MAC ở chỗ chỉ người giữ private key mới ký được, còn public key dùng để kiểm tra.'},
      {keys:['hash','collision','digest'], hint:'Hash không khóa chủ yếu phục vụ digest/toàn vẹn; collision resistance và one-way là hai thuộc tính rất hay bị hỏi.'},
      {keys:['firewall','acl','dmz','stateful'], hint:'Khi làm câu firewall, hãy xét vị trí vùng mạng, nguyên tắc default deny/least privilege và firewall có nhớ trạng thái phiên hay không.'},
      {keys:['wep','wpa','evil','deauth','wifi','wi-fi'], hint:'Các câu Wi-Fi thường bẫy giữa nghe lén, AP giả, bắt handshake và điểm yếu WEP/WPS.'},
      {keys:['rsa','phi','public key','private key'], hint:'RSA xoay quanh n=pq, phi(n), nghịch đảo d của e và khác biệt giữa mã hóa bằng public key với ký bằng private key.'},
      {keys:['aes','des','ecb','cbc','block'], hint:'Với mã khối, cần phân biệt kích thước block, độ dài khóa và mode hoạt động; ECB hay bị hỏi vì lộ mẫu lặp.'},
      {keys:['kerberos','ticket','kdc'], hint:'Kerberos dựa trên KDC, TGT, service ticket và khóa phiên để tránh gửi mật khẩu cho từng dịch vụ.'}
    ];
    const matched = hints.find(item => item.keys.some(k => text.includes(k)));
    const extra = matched ? matched.hint : 'Hãy đối chiếu khái niệm cốt lõi với tình huống trong câu, rồi loại phương án nói quá rộng hoặc lệch tầng giao thức.';
    return base ? `${base} ${extra}` : extra;
  }

  function findQuestion(uid){
    for(const set of currentExamSets){
      const q = set.questions.find(item => item.uid === uid);
      if(q) return q;
    }
    return currentExam.find(q => q.uid === uid);
  }

  function normalizeChoice(value){
    if(value === 'true') return true;
    if(value === 'false') return false;
    return Number(value);
  }

  function isCorrect(q, choice){
    return q.type === 'tf' ? choice === q.answer : Number(choice) === Number(q.answer);
  }

  function selectAnswer(button){
    if(examSubmitted) return;
    const uid = button.dataset.qid;
    const q = findQuestion(uid);
    if(!q) return;
    const choice = normalizeChoice(button.dataset.choice);
    userAnswers[uid] = choice;
    activeQuestionUid = uid;
    const card = button.closest('.question-card');
    card.querySelectorAll('.option-btn').forEach(btn => {
      btn.classList.remove('selected', 'correct', 'incorrect');
    });
    button.classList.add('selected');

    if($('answerMode')?.value === 'practice'){
      revealQuestionResult(q, card);
      const gradableQuestions = currentExam.filter(isGradable);
      if(gradableQuestions.length && gradableQuestions.every(item => Object.prototype.hasOwnProperty.call(userAnswers, item.uid))){
        markCurrentExamCompleted();
      }
    }
    updateQuestionNavigator();
  }

  function revealQuestionResult(q, card){
    const choice = userAnswers[q.uid];
    card.querySelectorAll('.option-btn').forEach(btn => {
      const btnChoice = normalizeChoice(btn.dataset.choice);
      const correct = isCorrect(q, btnChoice);
      btn.classList.toggle('correct', correct);
      btn.classList.toggle('incorrect', btnChoice === choice && !correct);
    });
    const answer = card.querySelector('.answer');
    if(answer){
      answer.innerHTML = answerHtml(q, choice);
      answer.classList.remove('hidden');
    }
  }

  function submitExam(autoSubmitted=false){
    if(examSubmitted) return;
    examSubmitted = true;
    stopTimer();
    document.body.classList.add('exam-submitted');
    let total = 0, correct = 0;
    currentExam.forEach(q => {
      if(!isGradable(q)) return;
      total++;
      const card = document.querySelector(`.question-card[data-qid="${CSS.escape(q.uid)}"]`);
      if(!card) return;
      if(Object.prototype.hasOwnProperty.call(userAnswers, q.uid) && isCorrect(q, userAnswers[q.uid])) correct++;
      revealQuestionResult(q, card);
      card.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
    });
    const score = total ? ((correct / total) * 10).toFixed(2) : '0.00';
    const box = $('examResult');
    if(box){
      box.innerHTML = `<strong>${autoSubmitted ? 'Hết giờ, hệ thống đã tự nộp bài.' : 'Kết quả:'}</strong> ${correct}/${total} câu đúng · Điểm khoảng ${score}/10`;
      box.classList.remove('hidden');
      box.scrollIntoView({behavior:'smooth', block:'center'});
    }
    updateAnswerModeUI();
    updateQuestionNavigator();
    markCurrentExamCompleted();
  }

  function buildMatchHtml(q){
    const leftRows = q.matchLeft.map((l,i)=>`<tr><td>${i+1}. ${escapeHtml(l)}</td><td>${letters[i] || i+1}. ${escapeHtml(q.matchRight[i] || '')}</td></tr>`).join('');
    return `<table class="match-table"><thead><tr><th>Cột A</th><th>Cột B</th></tr></thead><tbody>${leftRows}</tbody></table><p class="hint">Ghi dạng: 1-A, 2-B...</p>`;
  }

  function getExamDurationMinutes(){
    const raw = parseInt($('examDuration')?.value,10);
    if(Number.isFinite(raw) && raw > 0) return Math.max(5, Math.min(180, raw));
    const mode = $('mode')?.value;
    const count = parseInt($('count')?.value,10) || 40;
    return mode === 'docx' ? 75 : Math.max(15, Math.round(count * 1.8));
  }

  function startTimer(){
    stopTimer();
    const minutes = getExamDurationMinutes();
    if($('examDuration')) $('examDuration').value = minutes;
    timerEndsAt = Date.now() + minutes * 60 * 1000;
    tickTimer();
    timerId = setInterval(tickTimer, 1000);
  }

  function stopTimer(){
    if(timerId) clearInterval(timerId);
    timerId = null;
  }

  function tickTimer(){
    const remaining = Math.max(0, timerEndsAt - Date.now());
    const totalSeconds = Math.ceil(remaining / 1000);
    const badge = $('timerBadge');
    if(badge){
      badge.textContent = formatTime(totalSeconds);
      badge.classList.toggle('warning', totalSeconds <= 300);
    }
    if(totalSeconds <= 0 && $('answerMode')?.value === 'exam' && !examSubmitted){
      submitExam(true);
    }
  }

  function formatTime(totalSeconds){
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  function renderQuestionNavigator(){
    const grid = $('questionNavGrid');
    if(!grid) return;
    grid.innerHTML = currentExam.map(q => `<button type="button" class="q-nav-btn" data-qid="${escapeAttr(q.uid)}" title="Câu ${q.examIndex}">${q.examIndex}</button>`).join('');
    updateQuestionNavigator();
  }

  function updateQuestionNavigator(){
    const nav = $('examNavigator');
    const examMode = $('answerMode')?.value === 'exam';
    nav?.classList.toggle('hidden', !examMode || !currentExam.length);
    document.querySelectorAll('.q-nav-btn').forEach(btn => {
      const q = findQuestion(btn.dataset.qid);
      const answered = q && Object.prototype.hasOwnProperty.call(userAnswers, q.uid);
      btn.classList.toggle('answered', !!answered && !examSubmitted);
      btn.classList.toggle('current', btn.dataset.qid === activeQuestionUid);
      btn.classList.remove('done-correct', 'done-wrong');
      if(examSubmitted && q && isGradable(q)){
        const ok = answered && isCorrect(q, userAnswers[q.uid]);
        btn.classList.toggle('done-correct', ok);
        btn.classList.toggle('done-wrong', !ok);
      }
    });
  }

  function buildBlankAnswerGrid(n){
    const perBlock = 10, blocks = Math.ceil(n/perBlock);
    let html = '<h3 style="margin:0 0 6px;text-align:center">BẢNG TRẢ LỜI</h3><table><tbody>';
    for(let r=0;r<perBlock;r++){
      html += '<tr>';
      for(let b=0;b<blocks;b++){
        const no = b*perBlock+r+1;
        if(no<=n){
          html += `<th>${no}</th>` + letters.slice(0,5).map(l=>`<td>${l.toLowerCase()}</td>`).join('');
        }
      }
      html += '</tr>';
    }
    html += '</tbody></table>';
    return html;
  }

  function toggleAnswers(){
    if($('answerMode')?.value === 'exam' && !examSubmitted) return;
    answersVisible = !answersVisible;
    document.querySelectorAll('.answer').forEach(el=>el.classList.toggle('hidden', !answersVisible));
    $('toggleAnswersBtn').textContent = answersVisible ? 'Ẩn đáp án' : 'Hiện đáp án';
  }

  function renderTheory(){
    const cards = getSubject() === 'qtm' && typeof NETWORK_THEORY_CARDS !== 'undefined' ? NETWORK_THEORY_CARDS : THEORY_CARDS;
    $('theoryOutput').innerHTML = cards.map(card => `
      <article class="theory-card">
        <h3>${escapeHtml(card.lesson)} - ${escapeHtml(card.title)}</h3>
        <ul>${card.points.map(p=>`<li>${escapeHtml(p)}</li>`).join('')}</ul>
      </article>`).join('');
  }

  function renderStats(){
    const byLesson = {};
    const all = baseQuestions().concat(dynamicQuestions($('seed').value || 'stats', 80));
    for(const q of all){
      if(!byLesson[q.lesson]) byLesson[q.lesson] = {total:0, mcq:0, tf:0, fill:0, short:0, match:0, calc:0, hard:0};
      byLesson[q.lesson].total++;
      byLesson[q.lesson][q.type] = (byLesson[q.lesson][q.type]||0)+1;
      if(q.difficulty>=3) byLesson[q.lesson].hard++;
    }
    const rows = Object.entries(byLesson).sort().map(([lesson,s]) => `<tr><td><strong>${escapeHtml(lesson)}</strong></td><td>${s.total}</td><td>${s.mcq||0}</td><td>${s.tf||0}</td><td>${s.fill||0}</td><td>${s.short||0}</td><td>${s.match||0}</td><td>${s.calc||0}</td><td>${s.hard}</td></tr>`).join('');
    $('statsOutput').innerHTML = `<table class="stats-table"><thead><tr><th>Bài</th><th>Tổng</th><th>MCQ</th><th>Đ/S</th><th>Điền</th><th>Ngắn</th><th>Ghép</th><th>Tính</th><th>Câu khó</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  function exportExam(kind){
    if(!currentExam.length) generateExam();
    const seed = $('seed').value.trim() || 'exam';
    if(kind==='json'){
      download(`atmm-de-${safeName(seed)}.json`, JSON.stringify(currentExam, null, 2), 'application/json;charset=utf-8');
    } else {
      const html = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>Đề ATMMT ${escapeHtml(seed)}</title><style>${document.querySelector('style')?.textContent || ''}</style><link rel="stylesheet" href="styles.css"></head><body><main style="max-width:980px;margin:24px auto">${$('examMeta').outerHTML}${$('examOutput').outerHTML}</main></body></html>`;
      download(`atmm-de-${safeName(seed)}.html`, html, 'text/html;charset=utf-8');
    }
  }

  function download(filename, content, mime){
    const blob = new Blob([content], {type:mime});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    setTimeout(()=>URL.revokeObjectURL(url), 500);
  }

  function safeName(s){ return s.replace(/[^a-z0-9_-]+/gi,'-').replace(/-+/g,'-').slice(0,50); }
  function escapeHtml(v){
    return String(v).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }
  function escapeAttr(v){ return escapeHtml(v).replace(/`/g, '&#96;'); }

  function initTabs(){
    document.querySelectorAll('.tab').forEach(btn=>{
      btn.addEventListener('click',()=>{
        document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
        document.querySelectorAll('.tabPage').forEach(p=>p.classList.remove('active'));
        btn.classList.add('active');
        $(btn.dataset.tab).classList.add('active');
      });
    });
  }

  function applySubjectDefaults(){
    const subject = getSubject();
    if(subject === 'qtm'){
      if($('mode')) $('mode').value = 'mixed';
      if($('difficulty')) $('difficulty').value = 2;
      if($('count')) $('count').value = 28;
      if($('examDuration')) $('examDuration').value = 90;
      document.querySelectorAll('input[name="qtype"]').forEach(x=>{ x.checked = true; });
    } else {
      if($('mode')) $('mode').value = 'docx';
      if($('difficulty')) $('difficulty').value = 2;
      if($('count')) $('count').value = 40;
      if($('examDuration')) $('examDuration').value = 75;
      document.querySelectorAll('input[name="qtype"]').forEach(x=>{ x.checked = x.value === 'mcq'; });
    }
  }

  function initSubjectBehavior(){
    $('subject')?.addEventListener('change',()=>{
      applySubjectDefaults();
      initFilters();
      renderTheory();
      renderStats();
      renderExamPicker();
      generateExam();
    });
  }

  function initModeBehavior(){
    $('mode').addEventListener('change',()=>{
      const mode = $('mode').value;
      if(mode==='qtm-batch'){
        if($('subject')) $('subject').value = 'qtm';
        if($('answerMode')) $('answerMode').value = 'practice';
        $('difficulty').value = 2;
        $('count').value = 28;
        if($('variantCount')) $('variantCount').value = 25;
        if($('examDuration')) $('examDuration').value = 90;
        document.querySelectorAll('input[name="qtype"]').forEach(x=>{ x.checked = true; });
        initFilters();
        renderTheory();
        renderStats();
      } else if(mode==='docx'){
        $('count').value = 40;
        if($('examDuration')) $('examDuration').value = 75;
        document.querySelectorAll('input[name="qtype"]').forEach(x=>{ x.checked = x.value==='mcq'; });
        $('difficulty').value = 2;
      } else if(mode==='hard'){
        $('difficulty').value = 3;
        $('count').value = 35;
        if($('examDuration')) $('examDuration').value = 60;
      } else if(mode==='quick'){
        $('count').value = 15;
        if($('examDuration')) $('examDuration').value = 25;
      }
      generateExam();
    });
    document.querySelectorAll('.mode-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        $('answerMode').value = btn.dataset.answerMode;
        generateExam();
      });
    });
    updateAnswerModeUI();
  }

  function updateAnswerModeUI(){
    const batchMode = $('mode')?.value === 'qtm-batch';
    if(batchMode && $('answerMode')) $('answerMode').value = 'practice';
    const examMode = !batchMode && $('answerMode')?.value === 'exam';
    $('submitExamBtn')?.classList.toggle('hidden', !examMode);
    $('submitExamNavBtn')?.classList.toggle('hidden', !examMode || examSubmitted);
    $('toggleAnswersBtn')?.classList.toggle('hidden', examMode && !examSubmitted);
    $('variantCount')?.closest('.field')?.classList.toggle('hidden', examMode);
    $('examDuration')?.closest('.field')?.classList.toggle('hidden', !examMode);
    $('examPickerSection')?.classList.toggle('hidden', batchMode);
    document.querySelectorAll('.mode-choice').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.answerMode === $('answerMode')?.value);
    });
    if(!examMode) stopTimer();
    updateQuestionNavigator();
  }

  document.addEventListener('DOMContentLoaded',()=>{
    initFilters(); initTabs(); initSubjectBehavior(); initModeBehavior(); renderTheory(); renderStats(); renderExamPicker(); generateExam();
    $('generateBtn').addEventListener('click', generateExam);
    $('examNumber')?.addEventListener('change', ()=>selectExamNumber($('examNumber').value));
    $('examPicker')?.addEventListener('click', event => {
      const button = event.target.closest('[data-exam-number]');
      if(button) selectExamNumber(button.dataset.examNumber);
    });
    $('nextNewExamBtn')?.addEventListener('click', selectNextNewExam);
    $('submitExamBtn').addEventListener('click', ()=>submitExam(false));
    $('examOutput').addEventListener('click', (event)=>{
      const btn = event.target.closest('.option-btn');
      if(btn) selectAnswer(btn);
    });
    $('questionNavGrid')?.addEventListener('click', (event)=>{
      const btn = event.target.closest('.q-nav-btn');
      if(!btn) return;
      activeQuestionUid = btn.dataset.qid;
      updateQuestionNavigator();
      document.querySelector(`.question-card[data-qid="${CSS.escape(btn.dataset.qid)}"]`)?.scrollIntoView({behavior:'smooth', block:'start'});
    });
    $('toggleAnswersBtn').addEventListener('click', toggleAnswers);
    $('submitExamNavBtn')?.addEventListener('click', ()=>submitExam(false));
    $('printBtn').addEventListener('click', ()=>window.print());
    $('exportHtmlBtn').addEventListener('click', ()=>exportExam('html'));
    $('exportJsonBtn').addEventListener('click', ()=>exportExam('json'));
  });
})();
